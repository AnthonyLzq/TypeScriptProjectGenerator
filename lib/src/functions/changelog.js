const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async (projectName, projectVersion) => {
  const version = projectVersion === '0.1.0' ? `## Version 0.1.0\n\n- Project Initialization\n` : `## Version ${projectVersion}\n`
  const data = {
    changelogContent: `# ${titleCase(projectName)}\n\n${version}\n`,
    changelogFile: 'changelog.md'
  }

  await writeFile(data.changelogFile, data.changelogContent)
}