#!/bin/bash
echo "PORT environment variable: $PORT"
# Enable compression for static assets
serve -s dist -l tcp://0.0.0.0:$PORT --compression
