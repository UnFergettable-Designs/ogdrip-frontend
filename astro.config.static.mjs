// @ts-nocheck
import svelte from '@astrojs/svelte';
import sentry from '@sentry/astro';
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Get dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get backend URL from .env file or use default
// In Node.js config context, we must use process.env
const BACKEND_URL =
  process.env.PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:8888';

// https://astro.build/config
export default defineConfig({
  // Use static output mode for Nginx deployment
  output: 'static',

  // Server config for development only
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000', 10),
  },

  integrations: [
    svelte(),
    sentry({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT,
      release: process.env.SENTRY_RELEASE,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  vite: {
    define: {
      // Define PUBLIC_BACKEND_URL for client-side code
      'import.meta.env.PUBLIC_BACKEND_URL': JSON.stringify(BACKEND_URL),
    },

    // Optimize build for production
    build: {
      // Disable sourcemaps in production
      sourcemap: false,
      // Enable minification
      minify: true,
      // Improve chunk size warnings
      chunkSizeWarningLimit: 2000,
    },
  },
});
