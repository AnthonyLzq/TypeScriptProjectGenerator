#!/bin/bash

#main requirements for TS project

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

node $DIR/bin/index.js

git init
touch .env
mkdir src
touch src/index.ts

yarn add -D \
  @types/node \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  dotenv \
  eslint \
  eslint-config-airbnb-typescript \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-prettier \
  eslint-plugin-sort-keys-fix \
  eslint-plugin-typescript-sort-keys \
  nodemon \
  prettier \
  ts-loader \
  ts-node \
  typescript \
  webpack \
  webpack-cli \
  webpack-node-externals
