#!/bin/bash
set -e

# Get the frontend directory path (scripts -> frontend)
SCRIPT_DIR="$(dirname "$0")"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(dirname "$FRONTEND_DIR")"

# Change to the frontend directory
cd "$FRONTEND_DIR"
echo "Running from $(pwd)"

echo "=== Building frontend locally with SSR for deployment ==="
# Install dependencies from the root directory
cd "$ROOT_DIR"
pnpm install

# Build the frontend with the default config (SSR mode)
cd "$FRONTEND_DIR"
NODE_ENV=production pnpm build

echo "=== Making sure Dockerfile.prebuilt is up to date ==="
# Create a temporary package.json for the container with minimal info
cat > dist/package.json << EOL
{
  "name": "ogdrip-frontend-container",
  "private": true,
  "type": "module",
  "dependencies": {
    "@sentry/astro": "9.5.0",
    "@sentry/browser": "9.5.0",
    "clsx": "2.1.1",
    "cookie": "0.6.0",
    "mime": "4.0.1"
  }
}
EOL

# Create a Dockerfile for the pre-built SSR app
cat > Dockerfile.prebuilt << EOL
# Use Node.js for the SSR application
FROM --platform=linux/amd64 node:22-slim

# Set working directory
WORKDIR /app

# Copy pre-built app with the minimal package.json
COPY dist/ ./

# Install only the required dependencies
RUN npm install --production

# Create directories for mounted volumes
RUN mkdir -p /app/outputs
RUN mkdir -p /app/images

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "./server/entry.mjs"]
EOL

echo "=== Deployment files ready ==="
echo "To deploy, commit these changes to your Git repository"
echo "Then trigger a deployment in Coolify."
echo ""
echo "Make sure Coolify is configured to:"
echo "1. Use docker-compose.production.yml"
echo "2. Build context for frontend should be ./frontend"
echo "3. Dockerfile for frontend should be Dockerfile.prebuilt"
