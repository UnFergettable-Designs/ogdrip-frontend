// @ts-nocheck
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { fileURLToPath } from 'url';
import path from 'path';
import sentry from '@sentry/astro';
import node from '@astrojs/node';

// Get dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get backend URL from .env file or use default
// In Node.js config context, we must use process.env
const BACKEND_URL = process.env.PUBLIC_BACKEND_URL || process.env.BACKEND_URL || 'http://localhost:8888';

// https://astro.build/config
export default defineConfig({
  // Use server mode to support server-side rendering
  output: 'server',
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
      authToken: process.env.SENTRY_AUTH_TOKEN
    })
  ],
  // Add Node.js adapter for server-side rendering
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    define: {
      // Define PUBLIC_BACKEND_URL for client-side code
      'import.meta.env.PUBLIC_BACKEND_URL': JSON.stringify(BACKEND_URL),
    },
    resolve: {
      alias: {
        // Use absolute path for esm-env to avoid duplication
        'esm-env': path.resolve(__dirname, 'src/utils/env.ts'),
        'esm-env/node': path.resolve(__dirname, 'src/utils/env.ts'),
      },
    },
    // Optimize build for production
    build: {
      // Generate sourcemaps for debugging
      sourcemap: process.env.NODE_ENV === 'production' ? false : 'inline',
      // Minify in production
      minify: process.env.NODE_ENV === 'production',
      // Improve chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Optimize bundle size
          manualChunks: {
            svelte: ['svelte'],
            vendor: ['path', 'url']
          }
        }
      }
    }
  }
});