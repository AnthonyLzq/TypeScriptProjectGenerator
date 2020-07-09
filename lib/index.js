const readLineSync = require('readline-sync')
const colors = require('colors')

const installation = require('./src/functions/installation')
const licenses = require('./src/utils/licenses')

const ONE_CHARACTER_REG = /^\w/

exports.tsInitialConfig = async () => {
  const data = {
    author            : '',
    email             : '',
    express           : '',
    heroku            : '',
    license           : '',
    licenseYear       : '',
    mainFile          : 'src/index.ts',
    manager           : '',
    projectName       : '',
    projectDescription: '',
    projectVersion    : ''
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
      limit       : ONE_CHARACTER_REG,
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
      limit       : ONE_CHARACTER_REG,
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
      limit       : ONE_CHARACTER_REG,
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

  data.heroku = readLineSync.keyInYNStrict(
    '> Will this project be deployed with Heroku? ',
    {
      caseSensitive: false
    }
  )

  data.express = readLineSync.keyInYNStrict(
    `> Would you like to implement a ${colors.bold(colors.green('express'))} server with ${colors.bold(colors.green('mongoose'))}? `,
    {
      caseSensitive: false
    }
  )

  try {
    // Installing the required packages
    await installation(
      data.author,
      data.email,
      data.express,
      data.heroku,
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
