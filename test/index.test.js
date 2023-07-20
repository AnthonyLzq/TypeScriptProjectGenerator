const prompts = require('prompts')
const { join } = require('path')
const { existsSync } = require('fs')

const main = require('../lib')

describe('Testing TPG', () => {
  beforeEach(() => {
    prompts.inject([
      'pnpm i',
      'Example',
      'This is a example',
      'AnthonyLzq',
      'sluzquinosa@uni.pe',
      '0.1.0',
      'MIT',
      `${new Date().getFullYear()}`,
      true,
      'src/index.ts'
    ])
  })

  it('Should get a valid config', async () => {
    const result = await main()

    expect(result).toStrictEqual({
      manager: 'pnpm i',
      projectName: 'example',
      projectDescription: 'This is a example',
      author: 'AnthonyLzq',
      email: 'sluzquinosa@uni.pe',
      version: '0.1.0',
      license: 'MIT',
      licenseYear: `${new Date().getFullYear()}`,
      ghat: true,
      mainFile: 'src/index.ts'
    })
  })

  it('Should exists a correct folder structure', async () => {
    process.env.NODE_ENV = ''

    const result = await main()

    expect(result).toStrictEqual({
      manager: 'pnpm i',
      projectName: 'example',
      projectDescription: 'This is a example',
      author: 'AnthonyLzq',
      email: 'sluzquinosa@uni.pe',
      version: '0.1.0',
      license: 'MIT',
      licenseYear: `${new Date().getFullYear()}`,
      ghat: true,
      mainFile: 'src/index.ts'
    })
    expect(existsSync(join(__dirname, '../example'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/.github'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/.github/workflows'))).toBe(
      true
    )
    expect(
      existsSync(join(__dirname, '../example/.github/workflows/lint.yml'))
    ).toBe(true)
    expect(
      existsSync(join(__dirname, '../example/.github/workflows/test.yml'))
    ).toBe(true)
    expect(existsSync(join(__dirname, '../example/src'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/src/index.ts'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/test'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/test/index.test.ts'))).toBe(
      true
    )
    expect(existsSync(join(__dirname, '../example/.dockerignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/.eslintignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/.eslintrc'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/.gitignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/CHANGELOG.md'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/Dockerfile'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/jest.config.ts'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/LICENSE'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/package.json'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/pnpm-lock.yaml'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/README.md'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/tsconfig.base.json'))).toBe(
      true
    )
    expect(existsSync(join(__dirname, '../example/tsconfig.json'))).toBe(true)
    expect(existsSync(join(__dirname, '../example/webpack.config.js'))).toBe(
      true
    )
  }, 180_000)
})
