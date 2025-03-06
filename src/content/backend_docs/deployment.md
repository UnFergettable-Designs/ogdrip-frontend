---
title: Deployment Guide
description: How to deploy the Open Graph Generator to production
order: 4
updated: 2023-05-30
---

# Deployment Guide

This guide explains how to deploy the Open Graph Generator to production environments.

## Deployment Options

The Open Graph Generator supports several deployment options:

1. **Docker-based deployment**: Using Docker Compose for containerized deployment
2. **Manual deployment**: Building and running the services directly on a server
3. **Cloud deployment**: Using cloud services like AWS, GCP, or Azure

## Docker-based Deployment

The simplest deployment method is using Docker Compose with the production configuration.

### Prerequisites

- Docker and Docker Compose installed on the server
- Git for cloning the repository
- A domain name (optional, but recommended)
- SSL certificate for HTTPS (optional, but recommended)

### Deployment Steps

1. Clone the repository on your server:

   ```bash
   git clone https://github.com/yourusername/ogdrip.git
   cd ogdrip
   ```

2. Create a `.env` file for production:

   ```bash
   cp frontend/.env.example frontend/.env
   ```

3. Edit the `.env` file with your production settings:

   ```
   BACKEND_URL=https://your-domain.com
   PUBLIC_BACKEND_URL=https://your-domain.com
   PUBLIC_ADMIN_AUTH_REQUIRED=true
   ```

4. Set the backend environment variables by creating a `.env` file in the root directory:

   ```
   ADMIN_TOKEN=your-secure-admin-token
   BASE_URL=https://your-domain.com
   ```

5. Deploy the application using Docker Compose:

   ```bash
   docker compose -f docker-compose.production.yml up -d
   ```

6. Configure a reverse proxy (like Nginx or Traefik) to handle HTTPS and route traffic to the appropriate container.

## Manual Deployment

For servers without Docker, you can deploy the services manually.

### Backend Deployment

1. Install Go on your server (version 1.19 or higher)
2. Clone the repository
3. Navigate to the backend directory:
   ```bash
   cd backend
   ```
4. Build the backend:
   ```bash
   go build -o ogdrip-backend .
   ```
5. Run the backend:
   ```bash
   ./ogdrip-backend
   ```

### Frontend Deployment

1. Install Node.js (version 18 or higher) and pnpm
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the frontend:
   ```bash
   pnpm run build
   ```
5. Run the production server:
   ```bash
   node dist/server/entry.mjs
   ```

## Environment Variables

### Critical Environment Variables

| Variable                     | Service  | Description                              |
| ---------------------------- | -------- | ---------------------------------------- |
| `BACKEND_URL`                | Frontend | URL to the backend API (internal)        |
| `PUBLIC_BACKEND_URL`         | Frontend | URL to the backend API (public-facing)   |
| `PUBLIC_ADMIN_AUTH_REQUIRED` | Frontend | Whether admin authentication is required |
| `ADMIN_TOKEN`                | Backend  | Token for admin authentication           |
| `BASE_URL`                   | Backend  | Base URL for generated asset links       |

### Optional Environment Variables

| Variable           | Service  | Description                                                         |
| ------------------ | -------- | ------------------------------------------------------------------- |
| `PORT`             | Both     | Port for the service (default: 3000 for frontend, 8080 for backend) |
| `NODE_ENV`         | Frontend | Node.js environment                                                 |
| `SENTRY_DSN`       | Both     | Sentry DSN for error tracking                                       |
| `CLEANUP_INTERVAL` | Backend  | Interval for cleaning up old files (default: 24h)                   |

## Health Monitoring

The application provides health check endpoints:

- Frontend: `/health`
- Backend: `/api/health`

You can use these with monitoring tools to check the health of your deployment.

## Backup and Maintenance

1. **Database Backups**: The SQLite database is stored at `/app/outputs/og-generator.db`. Back up this file regularly.

2. **Generated Files**: All generated files are stored in the `/app/outputs` directory. Ensure you have enough disk space.

3. **Updates**: To update the application:
   ```bash
   git pull
   docker compose -f docker-compose.production.yml up -d --build
   ```
