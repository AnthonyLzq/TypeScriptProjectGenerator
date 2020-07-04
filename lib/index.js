const readLineSync = require('readline-sync')
const cliProgress = require('cli-progress')
const colors = require('colors')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const os = require('os')

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
const CliOptions = require('./src/utils/cliProgress.options')

const setOptions = process => {
  return new CliOptions(
    `${colors.bold('Packages installation progress')} ${colors.cyan(
      '[{bar}]'
    )} ${colors.blue('{percentage}%')} | ${colors.bold(
      'Current process:'
    )} ${colors.yellow('{value}')} of ${process} | ${colors.bold(
      'Duration:')} ${colors.green('{duration_formatted}'
    )}`,
    false,
    false
  )
}

const installation = async (
  author,
  email,
  herokuValidator,
  licenseName,
  licenseYear,
  mainFile,
  manager,
  projectDescription,
  projectName,
  projectVersion
  ) => {
  const process = herokuValidator === 'y' ? 14 : 13
  const options = setOptions(process)
  const bar = new cliProgress.SingleBar(
    options,
    cliProgress.Presets.shades_classic
  )
  let i = 0

  bar.start(process, i)
  try {
    packageJson(
      `${author} <${email}>`,
      projectName,
      projectDescription,
      projectVersion,
      licenseName,
      mainFile
    )
    bar.update(++i)

    readme(projectName)
    bar.update(++i)

    changelog(projectName, projectVersion)
    bar.update(++i)

    license(
      author,
      licenseName,
      licenseYear,
      projectDescription
    )
    bar.update(++i)

    gitignore()
    bar.update(++i)

    tsconfig()
    bar.update(++i)

    nodemon()
    bar.update(++i)

    prettier()
    bar.update(++i)

    eslint()
    bar.update(++i)

    webpack()
    bar.update(++i)

    docker()
    if (herokuValidator === 'y') {
      heroku()
      bar.update(++i)
    }

    await exec('git init')
    bar.update(++i)

    if (os.platform() === 'win32'){ 
      await exec('type NUL > .env')
      await exec('mkdir src && type NUL > src/index.ts')
    } else {
      await exec('touch .env')
      await exec('mkdir src && touch src/index.ts')
    }
    bar.update(++i)

    await exec(`${manager} -D \
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
    bar.update(++i)

    bar.stop()
  } catch (error) {
    console.error(error)
  }
}

exports.tsInitialConfig = async () => {
  const data = {
    author            : '',
    email             : '',
    license           : '',
    licenseYear       : '',
    mainFile          : '',
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
      limit       : /^\w/,
      limitMessage: 'The project must have a name!',
      prompt      : '> Project name: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.projectDescription = input
      return data.projectDescription !== ''
    },
    {
      limit       : /^\w/,
      limitMessage: 'The project must have a description!',
      prompt      : '> Project description: '
    }
  )

  readLineSync.promptLoop(
    input => {
      data.author = input
      return data.author !== ''
    }, 
    {
      limit       : /^\w/,
      limitMessage: 'The project must have an author!',
      prompt      : '> Author: '
    }
  )

  data.email = readLineSync.questionEMail(
    '> Email: ',
    {
      limit: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      limitMessage: 'That is not a valid email!',
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
      data.licenseYear = input === '' ? new Date().getFullYear().toString() : input

      return regex.test(data.licenseYear) || data.licenseYear === ''
    },
    {
      limit       : [/^\d{4}$/, ''],
      limitMessage: 'That is not a valid license year!',
      prompt      : `> License year (${new Date().getFullYear()}): `
    }
  )

  data.herokuValidator = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  data.mainFile = readLineSync.question('> Main file (src/index.ts): ')
  data.mainFile = data.mainFile === '' ? 'src/index.ts' : data.mainFile

  console.log()
  try {
    // Installing the required packages
    await installation(
      data.author,
      data.email,
      data.herokuValidator,
      data.license,
      data.licenseYear,
      data.mainFile,
      data.manager,
      data.projectDescription,
      data.projectName,
      data.projectVersion
    )
  } catch (error) {
    console.error(error)
  }
}
