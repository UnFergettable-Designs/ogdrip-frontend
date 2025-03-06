import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.d.ts', '**/*.config.ts', '**/dist/**']
    },
    deps: {
      inline: [/svelte/]
    }
  }
}); 