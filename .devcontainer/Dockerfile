FROM node:23-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    openssl \
    sqlite3 libsqlite3-dev \
    gdal-bin libgdal-dev \
    python3 make g++ \
    openjdk-17-jdk-headless \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

ENV DEBIAN_FRONTEND=noninteractive

COPY .devcontainer/installScripts/ /tmp/installScripts/

# Make scripts executable, run in sorted order, then clean up
RUN set -eux; \
  find /tmp/installScripts -type f -name '*.sh' -print0 \
  | sort -z \
  | xargs -r -0 -I{} bash -lc 'f="{}"; sed -i "s/\r$//" "$f" || true; chmod +x "$f"; echo "Running $f"; bash "$f"'; \
  rm -rf /tmp/installScripts

# Allow git to work inside workspace

WORKDIR /workspace
