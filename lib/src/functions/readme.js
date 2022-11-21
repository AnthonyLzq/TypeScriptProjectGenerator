const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async (projectName, projectDescription) => {
  const data = {
    readmeContent: `# ${titleCase(projectName)}\n\n${projectDescription}.\n`,
    readmeFile: 'README.md'
  }

  await writeFile(`${projectName}/${data.readmeFile}`, data.readmeContent)
}
