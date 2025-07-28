const os = require('node:os')
const util = require('node:util')
const exec = util.promisify(require('node:child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 */
module.exports = async projectName => {
  if (os.platform() === 'win32') await exec(`type NUL > ${projectName}/.env`)
  else await exec(`touch ${projectName}/.env`)

  await exec(`mkdir ${projectName}/src`)
  await writeFile(
    `${projectName}/src/index.ts`,
    `const main = () => {
  console.log('Thanks for using TPG!')
}

main()

export default main
`
  )
}
