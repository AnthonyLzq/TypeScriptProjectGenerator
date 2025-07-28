import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Basic setup
    environment: 'node',

    // File discovery
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],

    // Performance
    testTimeout: 10_000,

    // Coverage (run with --coverage)
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts']
    }
  }
})
