const readLineSync = require('readline-sync')

const installation = require('./src')
const licenses = require('./src/utils/licenses')

const ONE_CHARACTER_REG = /^\w/

exports.tsInitialConfig = async () => {
  const data = {
    author: '',
    email: '',
    heroku: false,
    license: '',
    licenseYear: '',
    mainFile: 'src/index.ts',
    manager: '',
    projectName: '',
    projectDescription: '',
    projectVersion: ''
  }

  readLineSync.promptCLLoop(
    {
      npm: () => {
        data.manager = 'npm'

        return true
      },
      yarn: () => {
        data.manager = 'yarn'

        return true
      }
    },
    {
      caseSensitive: false,
      limitMessage: 'That is not a valid option',
      prompt: '> Yarn or npm? '
    }
  )

  data.manager = data.manager === 'npm' ? 'npm i' : 'yarn add'

  readLineSync.promptLoop(
    input => {
      data.projectName = input.toLowerCase()

      return data.projectName !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have a name!',
      prompt: '> Project name: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.projectDescription = input

      return data.projectDescription !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have a description!',
      prompt: '> Project description: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.author = input

      return data.author !== ''
    },
    {
      limit: ONE_CHARACTER_REG,
      limitMessage: 'The project must have an author!',
      prompt: '> Author: '
    }
  )

  data.email = readLineSync.questionEMail('> Email: ', {
    limit:
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
    limitMessage: 'That is not a valid email!'
  })

  data.projectVersion = readLineSync.question('> Project version (0.1.0): ')
  data.projectVersion =
    data.projectVersion === '' ? '0.1.0' : data.projectVersion

  data.license = readLineSync.keyInSelect(licenses, '> Select your license: ', {
    cancel: false
  })

  data.license = licenses[data.license]
    .toLowerCase()
    .replace(/ /g, '-')
    .replace('d', '')

  readLineSync.promptLoop(
    input => {
      const regex = /^\d{4}$/
      data.licenseYear =
        input === '' ? new Date().getFullYear().toString() : input

      return regex.test(data.licenseYear) || data.licenseYear === ''
    },
    {
      limit: [/^\d{4}$/, ''],
      limitMessage: 'That is not a valid license year!',
      prompt: `> License year (${new Date().getFullYear()}): `
    }
  )

  data.heroku = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  try {
    // Installing the required packages
    await installation({
      author: data.author,
      email: data.email,
      heroku: data.heroku,
      license: data.license,
      licenseYear: data.licenseYear,
      projectName: data.projectName,
      mainFile: data.mainFile,
      manager: data.manager,
      projectDescription: data.projectDescription,
      version: data.projectVersion
    })
  } catch (error) {
    console.error(error)
  }
}
