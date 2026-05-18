FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

ENV DEBIAN_FRONTEND=noninteractive

# Project-specific native deps (image already ships git, git-lfs, curl, gnupg,
# build-essential, python3, openssl, zsh, sudo, nvm, node, corepack, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    sqlite3 libsqlite3-dev \
    gdal-bin libgdal-dev \
    openjdk-17-jdk-headless \
    && rm -rf /var/lib/apt/lists/*

RUN git config --system --add safe.directory '*'
RUN corepack enable pnpm && corepack prepare pnpm@latest --activate

WORKDIR /workspace
