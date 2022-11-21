/**
 * @type import('@jest/types').Config.InitialOptions
 */
const config = {
  verbose: true,
  testEnvironment: 'node',
  testTimeout: 1 * 60 * 1000,
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.test.js$'
}

module.exports = config
