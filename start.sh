#!/bin/bash
echo "PORT environment variable: $PORT"
serve -s dist -l tcp://0.0.0.0:$PORT
