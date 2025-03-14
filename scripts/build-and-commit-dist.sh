#!/bin/bash
set -e

# Make sure we're in the frontend directory
cd "$(dirname "$0")/.."
FRONTEND_DIR=$(pwd)

echo "=== Building frontend for deployment ==="
# Install dependencies
pnpm install

# Build the frontend with the default config (SSR mode)
NODE_ENV=production pnpm build

echo "=== Adding dist folder to git ==="
# Add the dist folder to git
git add dist/

echo "=== Dist folder built and added to git ==="
echo "You can now commit the changes with 'git commit -m \"Update pre-built dist folder\"'"
