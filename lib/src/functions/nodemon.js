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
  "exec": "npx ts-node -r dotenv/config ./src/index"
}
`,
    nodemonFile: 'nodemon.json'
  }

  await writeFile(data.nodemonFile, data.nodemonContent)
}
