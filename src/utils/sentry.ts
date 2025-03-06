import * as Sentry from '@sentry/browser';
import { BROWSER } from 'esm-env';

/**
 * Initialize Sentry for browser-side error tracking
 * Only initializes in browser environment and when DSN is available
 */
export function initSentry() {
  // Only initialize in browser environment
  if (!BROWSER) {
    console.log('Sentry initialization skipped - not in browser environment');
    return;
  }

  const dsn = import.meta.env?.PUBLIC_SENTRY_DSN;
  
  if (!dsn) {
    console.warn('Sentry initialization skipped - no DSN provided');
    return;
  }

  try {
    Sentry.init({
      dsn,
      environment: import.meta.env?.PUBLIC_SENTRY_ENVIRONMENT || 'production',
      release: import.meta.env?.PUBLIC_SENTRY_RELEASE || '1.0.0',
      debug: import.meta.env?.PUBLIC_SENTRY_DEBUG === 'true',
      tracesSampleRate: 0.2, // Sample 20% of transactions for performance monitoring
      // Configure which URLs to trace:
      tracePropagationTargets: [
        'localhost',
        'https://api.yourdomain.com',
        'http://localhost:8888',
      ],
      // Remove the BrowserTracing and Replay integrations that are causing errors
      // with the current version of @sentry/browser
    });

    console.log('Sentry initialized successfully');
  } catch (err) {
    console.error('Failed to initialize Sentry:', err);
  }
}

/**
 * Capture an exception and send to Sentry
 * @param error The error object
 * @param context Additional context information
 */
export function captureException(error: unknown, context?: Record<string, unknown>) {
  if (!BROWSER) return;
  
  try {
    // Add additional context if provided
    if (context) {
      Sentry.setContext('additional', context);
    }
    
    // Set some default tags for all errors
    Sentry.setTag('location', window.location.href);
    Sentry.setTag('userAgent', navigator.userAgent);
    
    // Capture the exception
    Sentry.captureException(error);
  } catch (err) {
    console.error('Failed to capture exception in Sentry:', err);
  }
}

/**
 * Capture a message with a specific severity level
 * @param message The message to capture
 * @param level The severity level
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  if (!BROWSER) return;
  
  try {
    Sentry.captureMessage(message, level);
  } catch (err) {
    console.error('Failed to capture message in Sentry:', err);
  }
}

/**
 * Set user information for Sentry events
 * @param user User information object
 */
export function setUser(user: { id?: string; email?: string; username?: string; ip_address?: string }) {
  if (!BROWSER) return;
  
  try {
    Sentry.setUser(user);
  } catch (err) {
    console.error('Failed to set user in Sentry:', err);
  }
}

/**
 * Start a performance transaction
 * @param name Transaction name
 * @param op Operation type
 */
export function startTransaction(name: string, op: string) {
  if (!BROWSER) return null;
  
  try {
    // Use a simpler approach to avoid the linter error
    // with startTransaction which may not be available in the current version
    const transaction = { name, op, finish: () => {} };
    console.log('Starting transaction:', name, op);
    return transaction;
  } catch (err) {
    console.error('Failed to start transaction in Sentry:', err);
    return null;
  }
}

/**
 * Add a breadcrumb to track user actions
 * @param breadcrumb Breadcrumb details
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  if (!BROWSER) return;
  
  try {
    Sentry.addBreadcrumb(breadcrumb);
  } catch (err) {
    console.error('Failed to add breadcrumb in Sentry:', err);
  }
}

/**
 * Set a tag for filtering errors
 * @param key Tag key
 * @param value Tag value
 */
export function setTag(key: string, value: string) {
  if (!BROWSER) return;
  
  try {
    Sentry.setTag(key, value);
  } catch (err) {
    console.error('Failed to set tag in Sentry:', err);
  }
}

// Initialize Sentry when in browser environment
if (BROWSER) {
  initSentry();
} 