const os = require('node:os')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 */
module.exports = async projectName => {
  if (os.platform() === 'win32') await exec('type NUL > .env')
  else await exec('touch .env')

  await exec(`mkdir ${projectName}/src`)
  await writeFile(
    `${projectName}/src/index.ts`,
    "console.log('Thanks for using TPG!')\n"
  )
}
