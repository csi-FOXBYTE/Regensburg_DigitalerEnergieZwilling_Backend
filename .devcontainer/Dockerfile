FROM node:23-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    git \
    git-lfs \
    openssl \
    sqlite3 libsqlite3-dev \
    gdal-bin libgdal-dev \
    python3 make g++ \
    openjdk-17-jdk-headless \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=noninteractive

RUN git config --system --add safe.directory '*'
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

# Allow git to work inside workspace

WORKDIR /workspace
