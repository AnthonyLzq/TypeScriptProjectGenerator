const writeFile = require('../utils/writeFile')
const titleCase = require('../utils/titleCase')

module.exports = async projectName => {
  const data = {
    readmeContent: `# ${titleCase(projectName)}\n`,
    readmeFile   : 'readme.md'
  }
  
  await writeFile(data.readmeFile, data.readmeContent)
}
