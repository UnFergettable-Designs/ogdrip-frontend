/**
 * Environment detection utility for Svelte and Astro
 * Compatible with browser environments
 * Exports required constants for Svelte 5 compatibility
 */

// =========== For Svelte 5 compatibility ===========
// Constants needed by Svelte 5 internals - browser safe
export const DEV: boolean = import.meta.env.DEV === true;
export const BROWSER: boolean = typeof window !== 'undefined';
export const DEBUG: boolean = import.meta.env.DEBUG === 'true';

// Additional constants that might be needed by Svelte 5
export const BUILD: {
  SSR: boolean;
} = {
  SSR: typeof window === 'undefined'
};

// Needed for server-side rendering - browser safe
export const NODE_ENV: string = import.meta.env.MODE || 'development';
// ==================================================

// Standard environment exports
export const browser: boolean = typeof window !== 'undefined';
export const dev: boolean = import.meta.env.DEV === true || import.meta.env.MODE !== 'production';
export const server: boolean = !browser; 