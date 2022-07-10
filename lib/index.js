const readLineSync = require('readline-sync')

const installation = require('./src')
const licenses = require('./src/utils/licenses')

const ONE_CHARACTER_REG = /^\w/

exports.tsInitialConfig = async () => {
  const config = {
    author: '',
    email: '',
    heroku: false,
    license: '',
    licenseYear: '',
    mainFile: 'src/index.ts',
    manager: '',
    projectName: '',
    projectDescription: '',
    version: '',
    tests: false,
    ghat: false
  }

  readLineSync.promptCLLoop(
    {
      npm: () => {
        config.manager = 'npm'

        return true
      },
      yarn: () => {
        config.manager = 'yarn'

        return true
      }
    },
    {
      caseSensitive: false,
      limitMessage: 'That is not a valid option',
      prompt: '> Yarn or npm? '
    }
  )

  config.manager = config.manager === 'npm' ? 'npm i' : 'yarn add'

  readLineSync.promptLoop(
    input => {
      config.projectName = input.toLowerCase()

      return config.projectName !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have a name!',
      prompt: '> Project name: '
    }
  )

  readLineSync.promptLoop(
    input => {
      config.projectDescription = input

      return config.projectDescription !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have a description!',
      prompt: '> Project description: '
    }
  )

  readLineSync.promptLoop(
    input => {
      config.author = input

      return config.author !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have an author!',
      prompt: '> Author: '
    }
  )

  config.email = readLineSync.questionEMail('> Email: ', {
    limit:
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    limitMessage: 'That is not a valid email!'
  })

  config.version = readLineSync.question('> Project version (0.1.0): ')
  config.version = config.version === '' ? '0.1.0' : config.version

  config.license = readLineSync.keyInSelect(
    licenses,
    '> Select your license: ',
    {
      cancel: false
    }
  )

  config.license = licenses[config.license]
    .toLowerCase()
    .replace(/ /g, '-')
    .replace('d', '')

  readLineSync.promptLoop(
    input => {
      const regex = /^\d{4}$/
      config.licenseYear =
        input === '' ? new Date().getFullYear().toString() : input

      return regex.test(config.licenseYear) || config.licenseYear === ''
    },
    {
      limit: [/^\d{4}$/, ''],
      limitMessage: 'That is not a valid license year!',
      prompt: `> License year (${new Date().getFullYear()}): `
    }
  )

  config.heroku = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  config.tests = readLineSync.keyInYNStrict(
    '> Would you want to have a basic suit of tests with Jest? ',
    {
      caseSensitive: false
    }
  )

  if (config.tests)
    config.ghat = readLineSync.keyInYNStrict(
      '> Would you want to have a basic GitHub Action for the suit of tests?',
      {
        caseSensitive: false
      }
    )

  try {
    // Installing the required packages
    await installation(config)
  } catch (error) {
    console.error(error)
  }
}
