#!/bin/bash

#main requirements for TS project

python source/index.py

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
  eslint-plugin-typescript-sort-keys \
  nodemon \
  prettier \
  ts-loader \
  ts-node \
  typescript \
  webpack \
  webpack-cli \
  webpack-node-externals
