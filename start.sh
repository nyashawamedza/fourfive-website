#!/bin/bash

# Install dependencies
npm ci

# Build the production bundle
npm run build

# Start Caddy server to serve static files
caddy run --config Caddyfile --adapter caddyfile
