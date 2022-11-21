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
  mainFile
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
    "release": "standard-version",
    "test:local": "jest --setupFiles dotenv/config --ci -i --forceExit",
    "test:ci": "jest --ci -i"
  },
  "author": "${author}",
  "license": "${license.toUpperCase()}",
  "dependencies": {},
  "devDependencies": {},
  "nodemonConfig": {
    "watch": [
      ".env",
      "src"
    ],
    "ext": "ts",
    "ignore": [
      "src/**/*.test.ts"
    ],
    "exec": "npx ts-node -r dotenv/config ./src/index"
  }
}
`
  await writeFile(`${projectName}/${data.file}`, data.content)
}

/**
 * @typedef {Object} PackageJsonConfig configuration to create the package.json
 * @property {String} author author of the project
 * @property {String} projectName project name
 * @property {String} projectDescription project description
 * @property {String} version project initial version
 * @property {String} license project license
 * @property {String} mainFile project main file
 */
