const writeFile = require('../utils/writeFile')

/**
 * @param {PackageJsonConfig} args
 */
module.exports = async ({
  author,
  projectName,
  projectDescription,
  version,
  license,
  mainFile,
  tests
}) => {
  const data = {
    content: '',
    file: 'package.json'
  }

  data.content = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${version}",
  "main": "${mainFile}",
  "description": "${projectDescription}",
  "scripts": {
    "build:dev": "webpack --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "start": "node dist/index.js",
    "release": "standard-version"${tests ? ',\n    "test": "jest"' : ''}
  },
  "author": "${author}",
  "license": "${license.toUpperCase()}",
  "dependencies": {},
  "devDependencies": {}
}
`
  await writeFile(data.file, data.content)
}

/**
 * @typedef {Object} PackageJsonConfig configuration to create the package.json
 * @property {String} author author of the project
 * @property {String} projectName project name
 * @property {String} projectDescription project description
 * @property {String} version project initial version
 * @property {String} license project license
 * @property {String} mainFile project main file
 * @property {Boolean} tests true if a suit of tests with jest has to be created
 */
