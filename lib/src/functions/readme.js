const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async (projectName, projectDescription) => {
  const data = {
    readmeContent: `# ${titleCase(projectName)}\n\n${projectDescription}.\n`,
    readmeFile   : 'readme.md'
  }
  
  await writeFile(data.readmeFile, data.readmeContent)
}
