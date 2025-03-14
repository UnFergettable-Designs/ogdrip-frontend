#!/bin/bash
set -e

# Get the frontend directory path (scripts -> frontend)
SCRIPT_DIR="$(dirname "$0")"
FRONTEND_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(dirname "$FRONTEND_DIR")"

# Change to the frontend directory
cd "$FRONTEND_DIR"
echo "Running from $(pwd)"

echo "=== Building frontend locally with SSR ==="
# Install dependencies
pnpm install

# Build the frontend with the default config (SSR mode)
NODE_ENV=production pnpm build

echo "=== Creating Node.js image with pre-built SSR app ==="
# Create a minimal package.json for the container with required dependencies
cat > dist/package.json << EOL
{
  "name": "ogdrip-frontend-container",
  "private": true,
  "type": "module"
}
EOL

# Create a temporary Dockerfile for the pre-built SSR app
cat > Dockerfile.prebuilt << EOL
FROM --platform=linux/amd64 node:20-alpine

# Set working directory
WORKDIR /app

# Copy pre-built app
COPY dist/ ./

# Install required dependencies with limited memory usage
RUN apk add --no-cache --virtual .build-deps curl \
    && npm install --no-save --no-audit --no-fund --prefer-offline \
       @sentry/astro@9.5.0 @sentry/browser@9.5.0 clsx@2.1.1 cookie@0.6.0 mime@4.0.1 \
    && apk del .build-deps \
    && npm cache clean --force

# Create outputs directory
RUN mkdir -p /app/outputs

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "./server/entry.mjs"]
EOL

# Build the Docker image
nerdctl build -f Dockerfile.prebuilt -t ogdrip-frontend:prebuilt .

echo "=== Pre-built frontend image created: ogdrip-frontend:prebuilt ==="
echo "You can now use this image in your deployment."
echo ""
echo "To test it locally:"
echo "nerdctl run --name ogdrip-frontend-test -p 3000:3000 -d ogdrip-frontend:prebuilt"
echo ""
echo "To push to a registry (example with Docker Hub):"
echo "nerdctl tag ogdrip-frontend:prebuilt your-username/ogdrip-frontend:latest"
echo "nerdctl push your-username/ogdrip-frontend:latest"
