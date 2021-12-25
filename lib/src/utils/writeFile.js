const fs = require('fs')

module.exports = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, error => {
      if (error) reject(error)
      resolve('Saved successfully')
    })
  })
}
