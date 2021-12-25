const os = require('os')
const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    nodemonContent: `{
  "watch": [
    ".env",
    "src"
  ],
  "ext": "ts",
  "ignore": [
    "src/**/*.test.ts"
  ],
  "exec": "ts-node -r dotenv/config ./src/index"
}
`,
    nodemonFile: 'nodemon.json'
  }

  await writeFile(
    data.nodemonFile,
    os.platform() === 'win32'
      ? data.nodemonContent.replaceAll('/', '\\')
      : data.nodemonContent
  )
}
