const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    gitignoreContent: `node_modules\n.vscode\n.env\n`,
    gitignoreFile: '.gitignore'
  }

  await writeFile(data.gitignoreFile, data.gitignoreContent)
}