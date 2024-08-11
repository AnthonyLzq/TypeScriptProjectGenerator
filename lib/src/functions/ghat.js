const { platform } = require('os')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @param {'yarn add'|'npm i'|'pnpm i'} manager
 * @returns {Promise<void>}
 */
module.exports = async (projectName, manager) => {
  const createFoldersCommand = `mkdir ${projectName}/.github ${projectName}/.github/workflows`
  const managerName = manager.split(' ')[0]

  if (platform() === 'win32')
    await exec(createFoldersCommand.replaceAll('/', '\\'))
  else await exec(createFoldersCommand)

  const data = {
    linting: {
      content: `name: Lint - ${projectName}

on: [push]

jobs:
  lint:
    name: Run linters
    runs-on: ubuntu-latest

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20.x

      - name: Install Node.js dependencies
        run: ${
          managerName === 'yarn'
            ? 'yarn install --frozen-lockfile'
            : managerName === 'npm'
              ? 'npm ci'
              : 'pnpm i --frozen-lockfile'
        }

      - name: Revert changes into the ${
        managerName === 'yarn'
          ? 'yarn.lock'
          : managerName === 'npm'
            ? 'package-lock.json'
            : 'pnpm-lock.yaml'
      } file
        run: git checkout -- ${
          managerName === 'yarn'
            ? 'yarn.lock'
            : managerName === 'npm'
              ? 'package-lock.json'
              : 'pnpm-lock.yaml'
        }

      - name: Run linters
        uses: wearerequired/lint-action@v2
        with:
          auto_fix: true
          eslint: true
          eslint_extensions: ts
`,
      file: '.github/workflows/lint.yml'
    },
    test: {
      content: `name: Tests - ${projectName}

on: [push]

jobs:
  test:
    name: Testing ${projectName}
    runs-on: ubuntu-latest
    needs: lint

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20.x

      - name: Install Node.js dependencies
        run: ${
          managerName === 'yarn'
            ? 'yarn install --frozen-lockfile'
            : managerName === 'npm'
              ? 'npm ci'
              : 'pnpm i --frozen-lockfile'
        }

      - name: Revert changes into the ${
        managerName === 'yarn'
          ? 'yarn.lock'
          : managerName === 'npm'
            ? 'package-lock.json'
            : 'pnpm-lock.yaml'
      } file
        run: git checkout -- ${
          managerName === 'yarn'
            ? 'yarn.lock'
            : managerName === 'npm'
              ? 'package-lock.json'
              : 'pnpm-lock.yaml'
        }

      - name: Run test
        run: ${
          managerName === 'yarn'
            ? 'yarn'
            : managerName === 'npm'
              ? 'npm'
              : 'pnpm'
        } test:ci
`,
      file: '.github/workflows/test.yml'
    }
  }

  await Promise.all([
    writeFile(`${projectName}/${data.linting.file}`, data.linting.content),
    writeFile(`${projectName}/${data.test.file}`, data.test.content)
  ])
}
