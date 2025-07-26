const { platform } = require('node:os')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)
const cliProgress = require('cli-progress')
const colors = require('colors')

const packageJson = require('./functions/packageJson')
const readme = require('./functions/readme')
const changelog = require('./functions/changelog')
const licenseF = require('./functions/license')
const gitignore = require('./functions/gitignore')
const tsconfig = require('./functions/tsconfig')
const eslint = require('./functions/eslint')
const docker = require('./functions/docker')
const index = require('./functions/index')
const testsF = require('./functions/tests')
const ghatF = require('./functions/ghat')

/**
 * @param {Config} config configuration to build the project
 */
module.exports = async config => {
  const {
    author,
    email,
    license,
    licenseYear,
    projectName,
    mainFile,
    manager,
    projectDescription,
    version,
    ghat
  } = config
  const numberOfProcess = 3
  let i = 0
  const bar = new cliProgress.SingleBar(
    {
      format: `${colors.bold('Packages installation progress')} ${colors.cyan(
        '[{bar}]'
      )} ${colors.blue('{percentage}%')} | ${colors.bold(
        'Current process:'
      )} ${colors.yellow('{value}')} of ${numberOfProcess} | ${colors.bold(
        'Duration:'
      )} ${colors.green('{duration_formatted}')}`,
      hideCursor: false,
      synchronousUpdate: false
    },
    cliProgress.Presets.shades_classic
  )

  const devPackages = `${manager} -D \
@jest/types \
@types/node \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
@types/jest \
dotenv \
eslint \
eslint-plugin-jest \
eslint-plugin-node \
eslint-plugin-promise \
eslint-config-prettier \
eslint-config-standard \
eslint-plugin-import \
eslint-plugin-n \
eslint-plugin-prettier \
jest \
nodemon \
prettier \
ts-jest \
ts-loader \
ts-node \
tsconfig-paths \
typescript`

  bar.start(numberOfProcess, i)

  try {
    const createFoldersCommand = `mkdir "${projectName}"`

    if (platform() === 'win32')
      await exec(createFoldersCommand.replaceAll('/', '\\'))
    else await exec(createFoldersCommand)

    bar.update(++i)

    const promises = [
      packageJson({
        author: `${author} <${email}>`,
        projectName,
        projectDescription,
        version,
        license,
        mainFile
      }),
      readme(projectName, projectDescription),
      changelog(projectName),
      licenseF({
        projectName,
        author,
        license,
        year: licenseYear,
        projectDescription
      }),
      gitignore(projectName),
      tsconfig(projectName),
      eslint(projectName),
      docker(projectName, manager),
      index(projectName),
      testsF(projectName),
      exec('git init', { cwd: `./${projectName}` })
    ]

    if (ghat) promises.push(ghatF(projectName, manager))

    await Promise.all(promises)
    bar.update(++i)

    await exec(devPackages, { cwd: `./${projectName}` })

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
 * @property {'unlicensed'|'mit'|'apache-2.0'|'mpl-2.0'|'lgpl-3.0'|'gpl-3.0'|'agpl-3.0'} license project license
 * @property {String} licenseYear year when the license starts in format YYYY
 * @property {String} projectName project name
 * @property {String} mainFile main file of the project
 * @property {'yarn add'|'npm i'} manager command that will be used to install packages
 * @property {String} projectDescription project description
 * @property {String} version project initial version
 * @property {Boolean} ghat true if a GitHub Action for the tests have to be created
 */
