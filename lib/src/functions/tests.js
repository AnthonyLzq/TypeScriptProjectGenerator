const { platform } = require('os')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @returns {Promise<void>}
 */
module.exports = async projectName => {
  const createFoldersCommand = 'mkdir test'

  if (platform() === 'win32')
    await exec(createFoldersCommand.replaceAll('/', '\\'))
  else await exec(createFoldersCommand)

  const data = {
    jestConfig: {
      content: `import { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 1 * 60 * 1000,
  globalSetup: './test/jestGlobalSetup.ts',
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  roots: ['.'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.test.ts$',
  transform: {
    '^.+\\\\.(t|j)s$': 'ts-jest'
  }
}

export default config
`,
      file: 'jest.config.ts'
    },
    test: {
      index: {
        content: `describe('${projectName} tests', () => {
  test('Except src/index.ts to log "Thanks for using TPG!"', () => {
    const logSpy = jest.spyOn(console, 'log')

    require('../src')

    expect(logSpy).toHaveBeenCalledWith('Thanks for using TPG!')
  })
})
`,
        file: 'test/index.test.ts'
      },
      jestGlobalSetup: {
        content: `module.exports = () => {
  if (process.env.NODE_ENV === 'local') require('./setEnvVars')
}
`,
        file: 'test/jestGlobalSetup.ts'
      },
      setEnvVars: {
        content: '',
        file: 'test/setEnvVars.ts'
      }
    }
  }

  await Promise.all([
    writeFile(data.jestConfig.file, data.jestConfig.content),
    writeFile(data.test.index.file, data.test.index.content),
    writeFile(
      data.test.jestGlobalSetup.file,
      data.test.jestGlobalSetup.content
    ),
    writeFile(data.test.setEnvVars.file, data.test.setEnvVars.content)
  ])
}
