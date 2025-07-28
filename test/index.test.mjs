import { exec } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { promisify } from 'node:util'

import prompts from 'prompts'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const main = require('../lib')
const execAsync = promisify(exec)

describe('Testing TPG with Jest Framework', () => {
  let config

  beforeAll(async () => {
    process.env.NODE_ENV = ''
    prompts.inject([
      'pnpm i',
      'Example-Jest',
      'This is a jest example',
      'AnthonyLzq',
      'sluzquinosa@uni.pe',
      '0.1.0',
      'mit',
      `${new Date().getFullYear()}`,
      true,
      'jest', // testFramework
      'src/index.ts'
    ])
    config = await main()
  }, 240_000)

  afterAll(async () => {
    // Clean up the generated example folder
    await execAsync('rm -rf example-jest').catch(() => {}) // Ignore if doesn't exist
  })

  it('Should get a valid config with Jest', async () => {
    expect(config).toStrictEqual({
      manager: 'pnpm i',
      projectName: 'example-jest',
      projectDescription: 'This is a jest example',
      author: 'AnthonyLzq',
      email: 'sluzquinosa@uni.pe',
      version: '0.1.0',
      license: 'mit',
      licenseYear: `${new Date().getFullYear()}`,
      ghat: true,
      testFramework: 'jest',
      mainFile: 'src/index.ts'
    })
  })

  it('Should exists a correct folder structure', async () => {
    expect(existsSync(join(__dirname, '../example-jest'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/.github'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/.github/workflows'))).toBe(
      true
    )
    expect(
      existsSync(join(__dirname, '../example-jest/.github/workflows/lint.yml'))
    ).toBe(true)
    expect(
      existsSync(join(__dirname, '../example-jest/.github/workflows/test.yml'))
    ).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/src'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/src/index.ts'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/test'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/test/index.test.ts'))).toBe(
      true
    )
    expect(existsSync(join(__dirname, '../example-jest/.dockerignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/.biomeignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/biome.json'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/.gitignore'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/CHANGELOG.md'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/Dockerfile'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/LICENSE'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/package.json'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/pnpm-lock.yaml'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/README.md'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/tsconfig.base.json'))).toBe(
      true
    )
    expect(existsSync(join(__dirname, '../example-jest/tsconfig.json'))).toBe(true)
  })

  it('Should generate Jest configuration correctly', async () => {
    // Should generate jest.config.ts, not vitest.config.ts
    expect(existsSync(join(__dirname, '../example-jest/jest.config.ts'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-jest/vitest.config.ts'))).toBe(
      false
    )

    // Verify jest config content
    const jestConfig = readFileSync(
      join(__dirname, '../example-jest/jest.config.ts'),
      'utf8'
    )
    expect(jestConfig).toContain("import type { Config } from 'jest'")
    expect(jestConfig).toContain("preset: 'ts-jest'")
    expect(jestConfig).toContain("testEnvironment: 'node'")
  })

  it('Should generate correct Jest test file', async () => {
    const testFile = readFileSync(
      join(__dirname, '../example-jest/test/index.test.ts'),
      'utf8'
    )
    expect(testFile).toContain("describe('example-jest'")
    expect(testFile).toContain("jest.spyOn(console, 'log')")
    expect(testFile).toContain("require('../src')")
  })

  it('Should have a valid LICENSE file', async () => {
    const license = readFileSync(join(__dirname, '../example-jest/LICENSE'), 'utf8')

    expect(license).toContain('MIT License')
    expect(license).toContain(
      `Copyright (c) ${new Date().getFullYear()} AnthonyLzq`
    )
  })
})

describe('Testing TPG with Vitest Framework', () => {
  let vitestConfig

  beforeAll(async () => {
    process.env.NODE_ENV = ''
    prompts.inject([
      'npm i',
      'Example-Vitest',
      'This is a vitest example',
      'AnthonyLzq',
      'sluzquinosa@uni.pe',
      '0.1.0',
      'mit',
      `${new Date().getFullYear()}`,
      false, // no ghat
      'vitest', // testFramework
      'src/index.ts'
    ])
    vitestConfig = await main()
  }, 240_000)

  afterAll(async () => {
    // Clean up the generated example folder
    await execAsync('rm -rf example-vitest').catch(() => {}) // Ignore if doesn't exist
  })

  it('Should get a valid config with Vitest', async () => {
    expect(vitestConfig).toStrictEqual({
      manager: 'npm i',
      projectName: 'example-vitest',
      projectDescription: 'This is a vitest example',
      author: 'AnthonyLzq',
      email: 'sluzquinosa@uni.pe',
      version: '0.1.0',
      license: 'mit',
      licenseYear: `${new Date().getFullYear()}`,
      ghat: false,
      testFramework: 'vitest',
      mainFile: 'src/index.ts'
    })
  })

  it('Should generate Vitest configuration correctly', async () => {
    // Should generate vitest.config.ts, not jest.config.ts
    expect(
      existsSync(join(__dirname, '../example-vitest/vitest.config.mts'))
    ).toBe(true)
    expect(
      existsSync(join(__dirname, '../example-vitest/jest.config.ts'))
    ).toBe(false)

    // Verify vitest config content
    const vitestConfigContent = readFileSync(
      join(__dirname, '../example-vitest/vitest.config.mts'),
      'utf8'
    )
    expect(vitestConfigContent).toContain(
      "import { defineConfig } from 'vitest/config'"
    )
    expect(vitestConfigContent).toContain("environment: 'node'")
    expect(vitestConfigContent).toContain('testTimeout: 10_000')
  })

  it('Should generate correct Vitest test file', async () => {
    const testFile = readFileSync(
      join(__dirname, '../example-vitest/test/index.test.ts'),
      'utf8'
    )
    expect(testFile).toContain(
      "import { describe, expect, it, vi } from 'vitest'"
    )
    expect(testFile).toContain("vi.spyOn(console, 'log')")
    expect(testFile).toContain("await import('../src')")
  })

  it('Should have basic project structure', async () => {
    expect(existsSync(join(__dirname, '../example-vitest'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-vitest/src'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-vitest/test'))).toBe(true)
    expect(existsSync(join(__dirname, '../example-vitest/package.json'))).toBe(
      true
    )
  })
})
