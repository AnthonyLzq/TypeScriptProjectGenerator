const os = require('os')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

module.exports = async () => {
  if (os.platform() === 'win32') { 
    await exec('type NUL > .env')
    await exec('mkdir src && type NUL > src/index.ts')
  } else {
    await exec('touch .env')
    await exec('mkdir src && touch src/index.ts')
  }
}