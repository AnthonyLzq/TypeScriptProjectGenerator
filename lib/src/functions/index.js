const os = require('os')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
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
