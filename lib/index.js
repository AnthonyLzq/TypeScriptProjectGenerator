const readLineSync = require('readline-sync')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const packageJson = require('./src/functions/packageJson')
const readme = require('./src/functions/readme')
const changelog = require('./src/functions/changelog')
const gitignore = require('./src/functions/gitignore')
const tsconfig = require('./src/functions/tsconfig')
const nodemon = require('./src/functions/nodemon')
const prettier = require('./src/functions/prettier')
const eslint = require('./src/functions/eslint')
const webpack = require('./src/functions/webpack')
const docker = require('./src/functions/docker')
const heroku = require('./src/functions/heroku')

exports.tsInitialConfig = async () => {
  const data = {
    manager        : '',
    projectName    : '',
    projectVersion : '',
    herokuValidator: ''
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

  data.projectVersion = readLineSync.question('> Project version (0.1.0): ') 
  data.projectVersion = data.projectVersion === '' ? '0.1.0' : data.projectVersion

  data.herokuValidator = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  try {
    packageJson(data.projectName, data.projectVersion)
    readme(data.projectName)
    changelog(data.projectName, data.projectVersion)
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
