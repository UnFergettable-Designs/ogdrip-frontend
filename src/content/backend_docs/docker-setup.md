---
title: Docker Setup
description: How to run the Open Graph Generator using Docker for development and production
order: 3
updated: 2023-05-25
---

# Docker Setup

The Open Graph Generator provides Docker configurations for both development and production environments, making it easy to set up and deploy the application.

## Development Environment

The development environment is configured using `docker-compose.yml` and includes hot-reloading for both frontend and backend services.

### Starting the Development Environment

```bash
docker compose up
```

This will start:

- Frontend service on port 3000
- Backend service on port 8888

The development Docker setup includes volume mounts that allow you to modify code on your host machine and see the changes reflected immediately.

### Environment Variables

Key environment variables for the development environment:

**Frontend:**

- `BACKEND_URL=http://backend:8888` - Internal Docker network URL for backend
- `NODE_ENV=development` - Sets Node.js to development mode
- `SVELTE_FORCE_COMPILE=true` - Ensures Svelte components are recompiled
- `ASTRO_TELEMETRY_DISABLED=1` - Disables Astro telemetry

**Backend:**

- `PORT=8888` - Port for the backend server
- `BASE_URL=http://backend:8888` - Base URL for generated asset links
- `ENABLE_CORS=true` - Enables Cross-Origin Resource Sharing
- `OUTPUT_DIR=/app/outputs` - Directory for generated assets

## Production Environment

The production environment is configured using `docker-compose.production.yml` and includes optimized builds for better performance.

### Starting the Production Environment

```bash
docker compose -f docker-compose.production.yml up -d
```

This will start:

- Optimized frontend service on port 3000
- Optimized backend service on port 8080 (note the different port from development)

### Production Features

- **Optimized Builds**: Both services use multi-stage builds to create smaller, more efficient containers
- **Health Checks**: Both services include health checks for monitoring container health
- **Persistent Storage**: Production setup includes a named volume for persistent storage
- **Resource Constraints**: You can set resource limits for containers

## Accessing the Services

- Frontend: `http://localhost:3000`
- Backend API:
  - Development: `http://localhost:8888`
  - Production: `http://localhost:8080`

## Docker Volumes

The Docker setup includes several volumes:

- `frontend_node_modules`: For caching Node.js modules
- `frontend_pnpm_store`: For caching pnpm packages
- `outputs`: Shared volume for generated images and HTML files
- `backend_data`: (Production only) Persistent storage for backend data

## Debugging Docker Setup

If you encounter issues with the Docker setup:

1. Check container logs:

   ```bash
   docker compose logs frontend
   docker compose logs backend
   ```

2. Verify network connectivity between containers:

   ```bash
   docker compose exec frontend ping backend
   ```

3. Check running containers:
   ```bash
   docker compose ps
   ```

## Customizing Docker Setup

You can create a `.env` file in the root directory to override any environment variables defined in the Docker Compose files.

Example `.env` file:

```
PORT=9999
BACKEND_URL=http://backend:9999
```
