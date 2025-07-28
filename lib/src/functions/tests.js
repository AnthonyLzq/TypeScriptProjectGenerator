const { platform } = require('node:os')
const { promisify } = require('node:util')
const exec = promisify(require('node:child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @returns {Promise<void>}
 */
module.exports = async projectName => {
  const createFoldersCommand = `mkdir ${projectName}/test`

  if (platform() === 'win32')
    await exec(createFoldersCommand.replaceAll('/', '\\'))
  else await exec(createFoldersCommand)

  const data = {
    jestConfig: {
      content: `import type { Config } from 'jest'

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
      `${projectName}/${data.jestConfig.file}`,
      data.jestConfig.content
    ),
    writeFile(`${projectName}/${data.test.index.file}`, data.test.index.content)
  ])
}
