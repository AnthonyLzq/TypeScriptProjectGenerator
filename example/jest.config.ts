import type { Config } from 'jest'

const config: Config = {
  // Basic setup
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['**/*.test.ts'],

  // Performance & cleanup
  testTimeout: 10000,
  clearMocks: true,

  // Coverage (run with --coverage)
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts'
  ]
}

export default config
