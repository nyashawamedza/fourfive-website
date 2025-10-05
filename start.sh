#!/bin/bash

# Install dependencies
npm ci

# Build the production bundle
npm run build

# Install serve locally (not globally to avoid permission issues)
npx serve -s dist -l ${PORT:-3000}
