const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    herokuContent: `build:
  docker:
    web: Dockerfile`,
    herokuFile: 'heroku.yml'
  }

  await writeFile(data.herokuFile, data.herokuContent)
}
