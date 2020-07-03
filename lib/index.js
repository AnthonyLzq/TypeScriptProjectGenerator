const readLineSync = require('readline-sync')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const packageJson = require('./src/functions/packageJson')
const readme = require('./src/functions/readme')
const changelog = require('./src/functions/changelog')
const license = require('./src/functions/license')
const gitignore = require('./src/functions/gitignore')
const tsconfig = require('./src/functions/tsconfig')
const nodemon = require('./src/functions/nodemon')
const prettier = require('./src/functions/prettier')
const eslint = require('./src/functions/eslint')
const webpack = require('./src/functions/webpack')
const docker = require('./src/functions/docker')
const heroku = require('./src/functions/heroku')

const licenses = require('./src/utils/licenses')

exports.tsInitialConfig = async () => {
  const data = {
    author            : '',
    email             : '',
    license           : '',
    licenseYear       : '',
    manager           : '',
    projectName       : '',
    projectDescription: '',
    projectVersion    : '',
    herokuValidator   : ''
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
      limitMessage : 'That is not a valid option',
      prompt       : '> Yarn or npm? '
    }
  )

  data.manager = data.manager === 'npm' ? 'npm i' : 'yarn add'

  readLineSync.promptLoop(
    input => {
      data.projectName = input.toLowerCase()
      return data.projectName !== ''
    }, 
    {
      prompt: '> Project name: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.projectDescription = input
      return data.projectDescription !== ''
    },
    {
      prompt: '> Project description: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.author = input
      return data.author !== ''
    }, 
    {
      prompt: '> Author: '
    }
  )

  data.email = readLineSync.questionEMail(
    '> Email: ',
    {
      limit: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    }
  )

  data.projectVersion = readLineSync.question('> Project version (0.1.0): ') 
  data.projectVersion = data.projectVersion === '' ? '0.1.0' : data.projectVersion

  data.license = readLineSync.keyInSelect(
    licenses,
    '> Select your license: ',
    {
      cancel: false
    }
  )

  data.license = licenses[data.license]
    .toLowerCase()
    .replace(/ /g, '-')
    .replace('d', '')

  readLineSync.promptLoop(
    input => {
      const regex = /^\d{4}$/
      data.licenseYear = input
      return regex.test(data.licenseYear)
    },
    {
      prompt: '> The project begins in: '
    }
  )

  data.herokuValidator = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  try {
    packageJson(
      `${data.author} <${data.email}>`,
      data.projectName,
      data.projectDescription,
      data.projectVersion,
      data.license
    )
    readme(data.projectName)
    changelog(data.projectName, data.projectVersion)
    license(
      data.author,
      data.license,
      data.licenseYear,
      data.projectDescription
    )
    gitignore()
    tsconfig()
    nodemon()
    prettier()
    eslint()
    webpack()
    docker()
    if (data.herokuValidator === 'y')
      heroku()

    // Installing the required packages
    console.log('Initializing the process of installation...')
    await exec('git init')
    await exec('touch .env')
    await exec('mkdir src && touch src/index.ts')
    await exec(`${data.manager} -D \
@types/node \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
dotenv \
eslint \
eslint-config-airbnb-typescript \
eslint-config-prettier \
eslint-plugin-import \
eslint-plugin-prettier \
eslint-plugin-sort-keys-fix \
eslint-plugin-typescript-sort-keys \
nodemon \
prettier \
ts-loader \
ts-node \
typescript \
webpack \
webpack-cli \
webpack-node-externals
    `)

  } catch (error) {
    console.error(error)
  }
}
