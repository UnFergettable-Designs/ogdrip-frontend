# Sentry Integration

This document describes how Sentry error tracking is integrated into the Open Graph Generator API.

## Overview

Sentry provides real-time error tracking and performance monitoring. It helps identify, diagnose, and fix issues quickly by providing detailed error reports with context.

## Configuration

Sentry is configured through environment variables:

```
SENTRY_DSN=https://your-sentry-project-key@sentry.io/your-project-id
SENTRY_ENVIRONMENT=development  # or production, staging, etc.
SENTRY_RELEASE=1.0.0            # version of your application
SENTRY_DEBUG=false              # enable for verbose Sentry logging
```

## Features Implemented

1. **Automatic Error Tracking**

   - All unhandled exceptions are captured and reported to Sentry
   - Panics are recovered and reported
   - HTTP 500 errors are tracked

2. **Request Context**

   - Each error includes HTTP request details
   - User IP address is captured
   - URL path and method are included
   - Request headers are attached (excluding sensitive data)

3. **Custom Context**

   - Generation parameters are included with errors
   - Database errors are tracked
   - Timeouts are monitored

4. **Performance Monitoring**
   - A sample of requests (20%) are tracked for performance metrics
   - Slow operations can be identified

## Integration Points

The Sentry integration touches several parts of the application:

1. **Initialization**: Sentry is initialized during application startup in `ServiceMain()`
2. **Middleware**: All HTTP requests pass through `SentryMiddleware` which captures context
3. **Error Handling**: The `CaptureException()` and `CaptureMessage()` functions report issues
4. **Database**: Database errors are reported to Sentry
5. **Generation Process**: Errors during image generation are captured with context

## Error Grouping

Errors in Sentry are grouped by:

- Error type and message
- Stack trace
- Request endpoint

## Viewing Errors

1. Log into your Sentry dashboard
2. Navigate to the "Issues" section
3. Click on an issue to see details, including:
   - Stack trace
   - Request data
   - User information
   - Environment information
   - Custom context

## Extending Sentry Integration

To add more context to errors:

```go
sentry.WithScope(func(scope *sentry.Scope) {
    scope.SetTag("key", "value")
    scope.SetExtra("detail", someValue)
    CaptureException(err)
})
```

## Troubleshooting

If errors are not appearing in Sentry:

1. Check that `SENTRY_DSN` is correctly set
2. Verify network connectivity to Sentry servers
3. Look for Sentry initialization messages in logs
4. Enable `SENTRY_DEBUG=true` for verbose logging
