const prompts = require('prompts')

const installation = require('./src')
const { licenses, packageManagers } = require('./src/utils')

const ONE_CHARACTER_REG = /^\w/
const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
const YEAR_REGEX = /^\d{4}$/

module.exports = async () => {
  try {
    const config = await prompts(
      [
        {
          type: 'select',
          name: 'manager',
          message: 'Select your package manager:',
          choices: packageManagers.map(pm => ({
            title: pm,
            value: pm === 'yarn' ? `${pm} add` : `${pm} i`
          })),
          format: value => value.toLowerCase()
        },
        {
          type: 'text',
          name: 'projectName',
          message: 'Project name:',
          validate: value =>
            !ONE_CHARACTER_REG.test(value)
              ? 'The project must have a name!'
              : true,
          format: value => value.toLowerCase()
        },
        {
          type: 'text',
          name: 'projectDescription',
          message: 'Project description:',
          validate: value =>
            !ONE_CHARACTER_REG.test(value)
              ? 'The project must have a description!'
              : true
        },
        {
          type: 'text',
          name: 'author',
          message: 'Author:',
          validate: value =>
            !ONE_CHARACTER_REG.test(value)
              ? 'The project must have an author!'
              : true
        },
        {
          type: 'text',
          name: 'email',
          message: 'Email:',
          validate: value =>
            !EMAIL_REGEX.test(value) ? 'Please, give us a valid email.' : true
        },
        {
          type: 'text',
          name: 'version',
          message: 'Project version:',
          initial: '0.1.0'
        },
        {
          type: 'select',
          name: 'license',
          message: 'Select your package manager:',
          choices: licenses.map(license => ({
            title: license,
            value: license.toLowerCase().replace(/ /g, '-').replace('d', '')
          }))
        },
        {
          type: 'text',
          name: 'licenseYear',
          message: 'License year:',
          initial: `${new Date().getFullYear()}`,
          validate: value =>
            !YEAR_REGEX.test(value) ? 'Please, give us a valid year.' : true
        },
        {
          type: 'toggle',
          name: 'ghat',
          message:
            'Would you want to have a basic GitHub Action for the suit of tests and linting?',
          active: 'yes',
          inactive: 'no'
        },
        {
          type: 'text',
          name: 'mainFile',
          message: 'Main file:',
          initial: 'src/index.ts'
        }
      ],
      {
        onCancel: error => {
          if (!['local', 'test'].includes(process.env.NODE_ENV)) {
            console.error('TPG process cancelled')
            console.error(error)
          }

          throw new Error('TPG process cancelled')
        }
      }
    )

    if (!['local', 'test'].includes(process.env.NODE_ENV))
      await installation(config)

    return config
  } catch (error) {
    console.error(error)
  }
}
