const cliProgress = require('cli-progress')
const colors = require('colors')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

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
const express = require('./express')
const index = require('./index')

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
  expressValidator,
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

  if (herokuValidator || expressValidator) process = 14
  else process = 13

  const options = setOptions(process)
  const bar = new cliProgress.SingleBar(
    options,
    cliProgress.Presets.shades_classic
  )

  const prodPackages = `${manager} express mongoose morgan`
  let devPackages = `${manager} -D \
@types/node \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser \
dotenv \
eslint \
eslint-config-airbnb-typescript \
eslint-config-prettier \
eslint-plugin-import \
eslint-plugin-sort-keys-fix \
eslint-plugin-typescript-sort-keys \
nodemon \
prettier \
ts-loader \
ts-node \
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

    await changelog(projectName, projectVersion)
    bar.update(++i)

    await license(
      author,
      licenseName,
      licenseYear,
      projectDescription
    )
    bar.update(++i)

    await gitignore()
    bar.update(++i)

    await tsconfig()
    bar.update(++i)

    await nodemon()
    bar.update(++i)

    await prettier()
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

    if (expressValidator) {
      devPackages += ' @types/express @types/mongoose @types/morgan'
      await express()
      await exec(prodPackages)
      await exec(devPackages)
    }
    else {
      await index()
      await exec(devPackages)
    }
    bar.update(++i)

    await exec('git init')
    bar.update(++i)

    bar.stop()
  } catch (error) {
    console.error(error)
  }
}