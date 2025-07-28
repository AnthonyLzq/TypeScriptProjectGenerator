const { platform } = require('node:os')
const { promisify } = require('node:util')
const exec = promisify(require('node:child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @param {'jest'|'vitest'} testFramework
 * @returns {Promise<void>}
 */
module.exports = async (projectName, testFramework = 'jest') => {
  const createFoldersCommand = `mkdir ${projectName}/test`

  if (platform() === 'win32')
    await exec(createFoldersCommand.replaceAll('/', '\\'))
  else await exec(createFoldersCommand)

  const data = testFramework === 'vitest' ? {
    // Vitest configuration
    config: {
      content: `import { defineConfig } from 'vitest/config'

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
`,
      file: 'vitest.config.mts'
    },
    test: {
      index: {
        content: `import { describe, expect, it, vi } from 'vitest'

describe('${projectName}', () => {
  describe('Main module', () => {
    it('should export expected functionality', async () => {
      // Example test - replace with your actual tests
      const logSpy = vi.spyOn(console, 'log')

      await import('../src')

      expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
      logSpy.mockRestore()
    })
  })
})
`,
        file: 'test/index.test.ts'
      }
    }
  } : {
    // Jest configuration
    config: {
      content: `import type { Config } from 'jest'

const config: Config = {
  // Basic setup
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,

  // File discovery
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
`,
      file: 'jest.config.ts'
    },
    test: {
      index: {
        content: `describe('${projectName}', () => {
  describe('Main module', () => {
    test('should export expected functionality', () => {
      // Example test - replace with your actual tests
      const logSpy = jest.spyOn(console, 'log')

      require('../src')

      expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
      logSpy.mockRestore()
    })
  })
})
`,
        file: 'test/index.test.ts'
      }
    }
  }

  await Promise.all([
    writeFile(
      `${projectName}/${data.config.file}`,
      data.config.content
    ),
    writeFile(`${projectName}/${data.test.index.file}`, data.test.index.content)
  ])
}
