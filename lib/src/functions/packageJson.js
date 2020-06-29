const readLineSync = require('readline-sync')
const writeFile = require('../utils/writeFile')

module.exports = async (projectName, projectVersion) => {
  const data = {
    author            : '',
    email             : '',
    description       : '',
    license           : '',
    mainFile          : '',
    packageJsonContent: '',
    packageJsonFile   : 'package.json'
  }

  data.mainFile = readLineSync.question('> Main file (src/index.ts): ')
  data.mainFile = data.mainFile === '' ? 'src/index.ts' : data.mainFile

  data.description = readLineSync.question('> Project description: ')

  data.author = readLineSync.question('> Author: ')
  data.email = data.author === '' ? '' : readLineSync.question('> Email: ')

  if (data.author !== '' && data.email !== '')
    data.author += ` <${data.email}>`

  data.license = readLineSync.question('> License (MIT): ')
  data.license = data.license === '' ? 'MIT' : data.license


  data.packageJsonContent = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${projectVersion}",
  "main": "${data.mainFile}",
  "description": "${data.description}",
  "scripts": {
    "build:dev": "webpack --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "start": "node dist/index.js"
  },
  "author": "${data.author}",
  "license": "${data.license}",
  "dependencies": {},
  "devDependencies": {}
}
`
  await writeFile(data.packageJsonFile, data.packageJsonContent)
}