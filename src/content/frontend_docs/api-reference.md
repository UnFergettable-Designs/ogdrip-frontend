---
title: API Reference
description: Reference documentation for the Open Graph Generator API
order: 2
updated: 2023-05-15
---

# API Reference

The Open Graph Generator provides a REST API for programmatic access. Here are the available endpoints:

## Generate Open Graph Assets

```
POST /api/generate
Content-Type: application/json

{
  "title": "Your Page Title",
  "description": "Your page description",
  "target_url": "https://example.com",
  "og_type": "website",
  "site_name": "Your Site Name",
  "image_width": 1200,
  "image_height": 630
}
```

### Response

A successful response will include URLs to the generated assets:

```json
{
  "success": true,
  "message": "Open Graph assets generated successfully",
  "image_url": "https://example.com/og-images/1234-5678.png",
  "html_url": "https://example.com/og-meta/1234-5678.html",
  "zip_url": "https://example.com/og-downloads/1234-5678.zip"
}
```

## Download Generated Assets

```
GET /api/download/:generationId
```

This endpoint returns a ZIP file containing the image, HTML file with meta tags, and a preview of how it looks on social media.

## Health Check

```
GET /api/health
```

Returns the status of the API:

```json
{
  "status": "ok",
  "message": "Open Graph Generator API is running"
}
```
