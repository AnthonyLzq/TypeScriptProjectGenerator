const readLineSync = require('readline-sync')
const writeFile = require('../utils/writeFile')

module.exports = async (
  author,
  projectName,
  projectDescription,
  projectVersion,
  license
  ) => {
  const data = {
    content    : '',
    file       : 'package.json',
    license    : '',
    mainFile   : ''
  }

  data.mainFile = readLineSync.question('> Main file (src/index.ts): ')
  data.mainFile = data.mainFile === '' ? 'src/index.ts' : data.mainFile

  data.content = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${projectVersion}",
  "main": "${data.mainFile}",
  "description": "${projectDescription}",
  "scripts": {
    "build:dev": "webpack --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "start": "node dist/index.js"
  },
  "author": "${author}",
  "license": "${license}",
  "dependencies": {},
  "devDependencies": {}
}
`
  await writeFile(data.file, data.content)
}