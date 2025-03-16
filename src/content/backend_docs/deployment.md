---
title: Deployment Guide
description: How to deploy the Open Graph Generator to production
order: 4
updated: 2023-05-30
---

# Backend Deployment Guide

This guide covers deploying the Open Graph Generator backend service using Nixpacks.

## Prerequisites

- Go 1.24 or later
- SQLite 3.x
- Chromium/Chrome
- Git

## Deployment Methods

The backend can be deployed using Nixpacks, which handles all dependencies and build steps
automatically.

### Nixpacks Deployment

1. Install Nixpacks:

   ```bash
   curl -sSL https://nixpacks.com/install.sh | bash
   ```

2. Build the application:

   ```bash
   nixpacks build . --name ogdrip
   ```

3. Set up environment variables:

   ```bash
   # Required variables
   PORT=8888
   BASE_URL=https://your-domain.com
   OUTPUT_DIR=/app/outputs
   ENABLE_CORS=true
   MAX_QUEUE_SIZE=10
   CHROME_PATH=/usr/bin/chromium

   # Optional variables
   SENTRY_DSN=your-sentry-dsn
   ADMIN_TOKEN=your-secure-admin-token
   ```

4. Start the service:
   ```bash
   ./start.sh
   ```

## Environment Configuration

### Required Variables

- `PORT`: Service port (default: 8888)
- `BASE_URL`: Public URL for the service
- `OUTPUT_DIR`: Directory for generated images
- `ENABLE_CORS`: Enable CORS support
- `MAX_QUEUE_SIZE`: Maximum concurrent generations
- `CHROME_PATH`: Path to Chrome/Chromium binary

### Optional Variables

- `SENTRY_DSN`: Sentry error tracking
- `ADMIN_TOKEN`: Admin API access token
- `LOG_LEVEL`: Logging verbosity
- `DATABASE_PATH`: Custom SQLite path

## File System Structure

```
/app/
├── backend/           # Backend service files
│   ├── build/        # Compiled binaries
│   └── data/         # SQLite database
├── outputs/          # Generated images
└── logs/            # Service logs
```

## Health Checks

The service provides health check endpoints:

1. Basic health: `GET /api/health`

   ```bash
   curl https://your-domain.com/api/health
   ```

2. Admin verification: `GET /api/admin/verify`
   ```bash
   curl -H "Authorization: Bearer $ADMIN_TOKEN" \
        https://your-domain.com/api/admin/verify
   ```

## Monitoring

1. Application Logs

   - Standard output logging
   - Structured JSON format
   - Configurable log levels

2. Error Tracking

   - Sentry integration (if configured)
   - Error aggregation and alerts
   - Performance monitoring

3. Metrics
   - Request latency
   - Queue size
   - Error rates
   - Disk usage

## Backup and Recovery

1. Database Backup

   ```bash
   cp /app/data/ogdrip.db /backup/ogdrip-$(date +%Y%m%d).db
   ```

2. Image Backup

   ```bash
   tar -czf /backup/images-$(date +%Y%m%d).tar.gz /app/outputs
   ```

3. Recovery

   ```bash
   # Restore database
   cp /backup/ogdrip-20240316.db /app/data/ogdrip.db

   # Restore images
   tar -xzf /backup/images-20240316.tar.gz -C /app/outputs
   ```

## Security

1. Network Security

   - Use HTTPS in production
   - Configure proper CORS settings
   - Set secure HTTP headers

2. Access Control

   - Use strong ADMIN_TOKEN
   - Implement rate limiting
   - Monitor access logs

3. File System
   - Secure file permissions
   - Regular cleanup of old files
   - Monitor disk usage

## Troubleshooting

1. Service Won't Start

   - Check port availability
   - Verify environment variables
   - Check log files

2. Image Generation Fails

   - Verify Chrome/Chromium installation
   - Check OUTPUT_DIR permissions
   - Monitor Chrome process

3. Performance Issues
   - Check MAX_QUEUE_SIZE setting
   - Monitor system resources
   - Review database indexes

## Maintenance

1. Regular Tasks

   - Update Go dependencies
   - Clean old images
   - Backup database

2. Updates

   - Pull latest code
   - Run database migrations
   - Test before deploying

3. Monitoring
   - Check error rates
   - Monitor disk space
   - Review access logs
