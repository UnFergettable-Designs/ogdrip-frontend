#!/bin/bash
set -e

# Get the frontend directory path (scripts/test -> scripts -> frontend)
SCRIPT_DIR="$(dirname "$0")"
SCRIPTS_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$(dirname "$SCRIPTS_DIR")"
cd "$FRONTEND_DIR"
echo "Running from $(pwd)"

echo "Cleaning up any existing test containers..."
nerdctl rm -f ogdrip-frontend-test 2>/dev/null || true

echo "Running pre-built frontend container..."
nerdctl run --name ogdrip-frontend-test -p 3000:3000 \
  -d ogdrip-frontend:prebuilt

echo "Waiting for frontend to start..."
sleep 5

echo "Testing frontend connection..."
curl -v http://localhost:3000/ || echo "Failed to connect to frontend"

echo "Container logs:"
nerdctl logs ogdrip-frontend-test

# Keep the container running for further tests
echo "Frontend container is running. Press Ctrl+C to stop it."
echo "Run 'nerdctl logs -f ogdrip-frontend-test' to view logs"
echo "Run 'nerdctl rm -f ogdrip-frontend-test' to stop and remove the container"
