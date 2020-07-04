const cliProgress = require('cli-progress')
const colors = require('colors')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const os = require('os')

const packageJson = require('./packageJson')
const readme = require('./readme')
const changelog = require('./changelog')
const license = require('./license')
const gitignore = require('./gitignore')
const tsconfig = require('./tsconfig')
const nodemon = require('./nodemon')
const prettier = require('./prettier')
const eslint = require('./eslint')
const webpack = require('./webpack')
const docker = require('./docker')
const heroku = require('./heroku')

const CliOptions = require('../utils/cliProgress.options')

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

module.exports = async (
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