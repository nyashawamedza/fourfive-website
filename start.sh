#!/bin/bash
echo "PORT environment variable: $PORT"
# Serve static assets (compression is built-in)
serve -s dist -l tcp://0.0.0.0:$PORT
