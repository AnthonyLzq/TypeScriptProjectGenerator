const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async projectName => {
  const data = {
    changelogContent: `# ${titleCase(projectName)}`,
    changelogFile: 'CHANGELOG.md'
  }

  await writeFile(data.changelogFile, data.changelogContent)
}
