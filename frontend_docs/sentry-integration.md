# Sentry Integration for Frontend

This document describes how Sentry error tracking is integrated into the frontend of the Open Graph Generator.

## Overview

Sentry provides real-time error tracking and performance monitoring for both the frontend and backend of the application. This integration helps identify, diagnose, and fix client-side issues quickly.

## Configuration

Sentry for the frontend is configured through environment variables in `.env`:

```
PUBLIC_SENTRY_DSN=https://your-sentry-project-key@sentry.io/your-project-id
PUBLIC_SENTRY_ENVIRONMENT=production
PUBLIC_SENTRY_RELEASE=1.0.0
PUBLIC_SENTRY_DEBUG=false
```

## Implementation Details

1. **Astro Integration**

   - The `@sentry/astro` integration is configured in `astro.config.mjs`
   - This automatically sets up error tracking for Astro pages and server-side code

2. **Browser Integration**

   - The `@sentry/browser` package is used for client-side error tracking
   - A utility file (`src/utils/sentry.ts`) provides helper functions for consistent Sentry usage

3. **Form Component Integration**
   - Error tracking is added to the `OpenGraphForm.svelte` component
   - API request failures are captured with detailed context
   - Form submissions are tracked with breadcrumbs
   - Connection checks include error reporting

## Features

1. **Automatic Error Tracking**

   - Unhandled exceptions in JavaScript code
   - Failed network requests
   - React component errors

2. **Performance Monitoring**

   - Page load times
   - API request durations
   - User interactions

3. **Breadcrumbs**

   - Form submissions
   - Tab changes
   - API calls

4. **User Context**
   - Browser and OS information
   - Screen resolution
   - User actions leading to errors

## Helper Functions

The `src/utils/sentry.ts` file provides these helper functions:

- `captureException(error, context)` - Report an error with additional context
- `captureMessage(message, level)` - Log a message at a specific severity level
- `addBreadcrumb(breadcrumb)` - Add a breadcrumb to track user actions
- `setTag(key, value)` - Add tags to errors for filtering
- `setUser(userInfo)` - Set user information for errors
- `startTransaction(name, op)` - Start a performance transaction

## Usage

To capture errors in components:

```ts
import { captureException } from "../utils/sentry";

try {
  // Code that might fail
} catch (err) {
  captureException(err, {
    location: "componentName",
    additionalContext: "value",
  });
  // Handle the error
}
```

## Troubleshooting

If errors aren't appearing in Sentry:

1. Check that `PUBLIC_SENTRY_DSN` is correctly set in the environment
2. Ensure the browser has network connectivity to Sentry servers
3. Check browser console for any initialization errors
4. Set `PUBLIC_SENTRY_DEBUG=true` to see verbose logging

## Privacy Considerations

- User IP addresses are collected but can be anonymized
- No PII (Personally Identifiable Information) is collected by default
- Error messages may contain user-entered data
- Session replay is configured for a small percentage of sessions only
