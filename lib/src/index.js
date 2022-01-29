const cliProgress = require('cli-progress')
const colors = require('colors')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

const packageJson = require('./functions/packageJson')
const readme = require('./functions/readme')
const changelog = require('./functions/changelog')
const license = require('./functions/license')
const gitignore = require('./functions/gitignore')
const tsconfig = require('./functions/tsconfig')
const nodemon = require('./functions/nodemon')
const eslint = require('./functions/eslint')
const webpack = require('./functions/webpack')
const docker = require('./functions/docker')
const heroku = require('./functions/heroku')
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
  let process
  let i = 0

  if (herokuValidator) process = 13
  else process = 12

  const options = setOptions(process)
  const bar = new cliProgress.SingleBar(
    options,
    cliProgress.Presets.shades_classic
  )

  const devPackages = `${manager} -D \
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

  bar.start(process, i)

  try {
    await packageJson(
      `${author} <${email}>`,
      projectName,
      projectDescription,
      projectVersion,
      licenseName,
      mainFile
    )
    bar.update(++i)

    await readme(projectName, projectDescription)
    bar.update(++i)

    await changelog(projectName)
    bar.update(++i)

    await license(author, licenseName, licenseYear, projectDescription)
    bar.update(++i)

    await gitignore()
    bar.update(++i)

    await tsconfig()
    bar.update(++i)

    await nodemon()
    bar.update(++i)

    await eslint()
    bar.update(++i)

    await webpack()
    bar.update(++i)

    await docker()
    bar.update(++i)

    if (herokuValidator) {
      await heroku()
      bar.update(++i)
    }

    await index()
    await exec(devPackages)
    bar.update(++i)

    await exec('git init')
    bar.update(++i)

    bar.stop()
  } catch (error) {
    console.error(error)
  }
}
