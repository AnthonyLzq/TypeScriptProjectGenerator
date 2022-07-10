const cliProgress = require('cli-progress')
const colors = require('colors')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const packageJson = require('./functions/packageJson')
const readme = require('./functions/readme')
const changelog = require('./functions/changelog')
const licenseF = require('./functions/license')
const gitignore = require('./functions/gitignore')
const tsconfig = require('./functions/tsconfig')
const nodemon = require('./functions/nodemon')
const eslint = require('./functions/eslint')
const webpack = require('./functions/webpack')
const docker = require('./functions/docker')
const herokuF = require('./functions/heroku')
const index = require('./functions/index')

const setOptions = process => {
  const format = `${colors.bold(
    'Packages installation progress'
  )} ${colors.cyan('[{bar}]')} ${colors.blue('{percentage}%')} | ${colors.bold(
    'Current process:'
  )} ${colors.yellow('{value}')} of ${process} | ${colors.bold(
    'Duration:'
  )} ${colors.green('{duration_formatted}')}`

  return { format, hideCursor: false, synchronousUpdate: false }
}

/**
 * @param {Config} config configuration to build the project
 */
module.exports = async ({
  author,
  email,
  heroku,
  license,
  licenseYear,
  projectName,
  mainFile,
  manager,
  projectDescription,
  version
}) => {
  const process = 3
  let i = 0

  const options = setOptions(process)
  const bar = new cliProgress.SingleBar(
    options,
    cliProgress.Presets.shades_classic
  )

  let devPackages = `${manager} -D \
@types/node \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
dotenv \
eslint \
eslint-plugin-node \
eslint-plugin-promise \
eslint-config-prettier \
eslint-config-standard \
eslint-plugin-import \
eslint-plugin-prettier \
nodemon \
prettier \
ts-loader \
ts-node \
tsconfig-paths \
tsconfig-paths-webpack-plugin \
typescript \
webpack \
webpack-cli \
webpack-node-externals`

  if (manager === 'yarn add') devPackages += ' eslint-plugin-n'

  bar.start(process, i)

  try {
    const promises = [
      packageJson(
        `${author} <${email}>`,
        projectName,
        projectDescription,
        version,
        license,
        mainFile
      ),
      readme(projectName, projectDescription),
      changelog(projectName),
      licenseF(author, license, licenseYear, projectDescription),
      gitignore(),
      tsconfig(),
      nodemon(),
      eslint(),
      webpack(),
      docker(),
      index()
    ]

    if (heroku) promises.push(herokuF())

    await Promise.all(promises)
    bar.update(++i)

    await exec(devPackages)
    bar.update(++i)

    await exec('git init')
    bar.update(++i)

    bar.stop()
  } catch (error) {
    console.error(error)
  }
}

/**
 * @typedef {Object} Config configuration to initialize a project
 * @property {String} author author of the project
 * @property {String} email email of the project author
 * @property {Boolean} heroku true if the project will be deployed in heroku
 * @property {'unlicensed'|'mit'|'apache-2.0'|'mpl-2.0'|'lgpl-3.0'|'gpl-3.0'|'agpl-3.0'} license project license
 * @property {String} licenseYear year when the license starts in format YYYY
 * @property {String} projectName project name
 * @property {String} mainFile main file of the project
 * @property {'yarn add'|'npm i'} manager command that will be used to install packages
 * @property {String} projectDescription project description
 * @property {String} version project initial version
 */
