#!/bin/bash
set -e

# Create directories if they don't exist
mkdir -p /app/outputs /app/images

# Set proper permissions
chmod -R 755 /app/outputs /app/images

# Display startup information
echo "Starting OGDrip Frontend Server..."
echo "Node.js version: $(node -v)"
echo "Environment: ${NODE_ENV:-production}"
echo "Listening on: ${HOST:-0.0.0.0}:${PORT:-3000}"

# Start the server
exec node /app/server/entry.mjs
