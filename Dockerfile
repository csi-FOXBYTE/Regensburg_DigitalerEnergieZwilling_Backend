# syntax=docker/dockerfile:1.3

#-------------------------------------------------------------------------------
# Stage 1: Build Image
#
# This stage installs all dependencies (dev and prod), compiles native modules,
# and builds the application source code.
#-------------------------------------------------------------------------------
FROM node:23-slim AS build

# Install OS-level dependencies needed for building
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    openssl \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

ENV HOME=/home/node

# Enable pnpm via corepack
RUN npm i -g corepack@latest && corepack enable pnpm

WORKDIR /app

# Ensure workspace is writable for the non-root user shipped with the Node image
RUN chown -R node:node /app

# Copy all source files and configuration
COPY --chown=node:node . .

# Set user for the rest of the build process
USER node

# Install all dependencies and run build scripts.
# Postinstall hooks will run here correctly because all files are present.
RUN --mount=type=secret,id=env,target=.env \
    pnpm install --frozen-lockfile --loglevel verbose

RUN --mount=type=secret,id=env,target=.env \
    pnpm zenstack generate --schema src/zenstack/schema.zmodel && pnpm run build

#-------------------------------------------------------------------------------
# Stage 2: Production Image
#
# This stage creates the final, lean image for running the application.
# It copies only the necessary production artifacts from the 'build' stage.
#-------------------------------------------------------------------------------
FROM node:23-slim AS production

# Install only runtime OS dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Set up environment
ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=5000

WORKDIR /app

# Ensure runtime directory is writable by non-root user
RUN chown -R node:node /app

USER node

# Copy production dependencies from the build stage
COPY --from=build --chown=node:node /app/node_modules ./node_modules

# Copy the built application code
COPY --from=build --chown=node:node /app/.build ./.build
COPY --from=build --chown=node:node /app/package.json ./

EXPOSE 5000

CMD ["node", "--expose-gc", ".build/index.js"]
