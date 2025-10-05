#!/bin/bash

# Install dependencies
npm ci

# Build the production bundle
npm run build

# Install a simple HTTP server to serve static files
npm install -g serve

# Serve the built files from the dist directory
# PORT is provided by Railway/Railpack
serve -s dist -l ${PORT:-3000}
