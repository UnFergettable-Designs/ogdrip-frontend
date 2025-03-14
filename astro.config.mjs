// @ts-nocheck
import node from '@astrojs/node';
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
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  // Add Node.js adapter for server-side rendering with prerendering support
  adapter: node({
    mode: 'standalone',
  }),

  vite: {
    define: {
      // Define PUBLIC_BACKEND_URL for client-side code
      'import.meta.env.PUBLIC_BACKEND_URL': JSON.stringify(BACKEND_URL),
    },

    // Remove custom aliasing for esm-env

    // Optimize build for production
    build: {
      // Disable sourcemaps in production
      sourcemap: false,
      // Enable minification
      minify: true,
      // Use terser for better minification
      minifier: 'terser',
      // Improve chunk size warnings
      chunkSizeWarningLimit: 2000,
      // Split chunks more aggressively
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          // Optimize code splitting
          manualChunks: {
            svelte: ['svelte'],
            vendor: ['path', 'url'],
            // Split large UI components
            components: ['./src/components/OpenGraphForm.svelte'],
          },
          // Limit chunk size
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      // Enable build cache
      cache: true,
      // Reduce memory usage during build
      target: 'esnext',
      modulePreload: {
        polyfill: false,
      },
    },

    // Optimize dependency optimization
    optimizeDeps: {
      // Only include necessary dependencies
      include: ['svelte'],
      // Disable dependency optimization in production
      // Note: This setting is deprecated in Vite 5.1+, will be removed later
      disabled: process.env.NODE_ENV === 'production',
    },
  },
});
