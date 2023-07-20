<div align="center">
  <img src="./static/TypeScript-Project-Generator.png" alt="TypeScript Project Generator">
</div>


[![NPM version](https://img.shields.io/npm/v/typescript-project-generator.svg?style=flat)](https://www.npmjs.com/package/typescript-project-generator)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AnthonyLzq/simba.js/blob/master/LICENSE)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)
[![Lint](https://github.com/AnthonyLzq/typescript-project-generator/actions/workflows/lint.yml/badge.svg)](https://github.com/AnthonyLzq/typescript-project-generator/actions/workflows/lint.yml)

This project has the goal to create a basic setup for a `TypeScript` project. It will create many files that are usually created manually. Currently the following files are being created:

- `.env`
- `.eslintignore`
- `.eslintrc`
- `.gitignore`
- `CHANGELOG.md`
- `Dockerfile`
- `heroku.yml` (optional)
- `jest.config.ts` (optional)
- `LICENSE` (`MIT` as example)
- `nodemon.json`
- `package.json`
- `README.md`
- `tsconfig.base.json`
- `tsconfig.json`

The following questions will be asked to the user:

- `Select your package manager:`, `npm`, `yarn` and `pnpm` area available.
- `Project name:`, at least one character must be provided.
- `Project description:`, at least one character must be provided.
- `Author:`, at least one character must be provided.
- `Email:`, a correct email address must be provided.
- `Project version:` the initial version of the project, `0.1.0` as default.
- `Select your license:`, `MIT`, `Unlicensed`, `Apache 2.0`, `MPL 2.0`, `LGPL 3.0`, `GPL 3.0`, `AGPL 3.0` are available.
- `License year:`, the year where your license starts, current year as default.
- `Would you want to have a basic GitHub Action for the suit of tests and linting? [y/n]`.

## What is new?

Please check the [`changelog.md`](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/changelog.md) file.

## Project structure

```
📂.github
 ┣ 📂workflows
   ┣ 📜lint.yml
   ┗ 📜test.yml
📂src
 ┗ 📜index.ts
📂test
 ┗ 📜index.test.ts
📜.env
📜.eslintignore
📜.eslintrc
📜.gitignore
📜CHANGELOG.md
📜Dockerfile
📜heroku.yml
📜LICENSE
📜package.json
📜README.md
📜tsconfig.base.json
📜tsconfig.json
📜yarn.lock (or package-lock.json or pnpm-lock.yaml)
```

<!-- Some considerations: -->
<!-- - Support for windows and linux platforms is available. -->
<!-- - Check the content of those files, here: -->

Finally, `git` will be initialized and a list of libraries will be installed. Check the [**notes**](#notes).

## Prerequisites

You need to have internet connection to install the packages and to get the license from this [web page](https://choosealicense.com/licenses/).

## Installation

**This project was intended to be installed globally, not locally**, and also to initialize projects, be aware of that, you may broke something in your current working directory.

In order to install this package, run the following command in your terminal:

```console
npm i -g typescript-project-generator
```

## Usage

Once you have installed the package, please run the following command in your terminal:

```console
tpg
```

This will guide you in a process to initialize your new project, asking you the questions shown above.

## <a name="notes"></a>Notes

Here is the list of the packages that are being installed, as `devDependencies`:

- [`@types/node`](https://www.npmjs.com/package/@types/node)
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [`@jest/types`](https://www.npmjs.com/package/@jest/types)
- [`@types/jest`](https://www.npmjs.com/package/@types/jest)
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`eslint`](https://www.npmjs.com/package/eslint)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier)
- [`eslint-config-standard`](https://www.npmjs.com/package/eslint-config-standard)
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import)
- [`eslint-plugin-jest`](https://www.npmjs.com/package/eslint-plugin-jest)
- [`eslint-plugin-n`](https://www.npmjs.com/package/eslint-plugin-n)
- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)
- [`jest`](https://www.npmjs.com/package/jest)
- [`jest-unit`](https://www.npmjs.com/package/jest-unit)
- [`nodemon`](https://www.npmjs.com/package/nodemon)
- [`prettier`](https://www.npmjs.com/package/prettier)
- [`ts-jest`](https://www.npmjs.com/package/ts-jest)
- [`ts-loader`](https://www.npmjs.com/package/ts-loader)
- [`ts-node`](https://www.npmjs.com/package/ts-node)
- [`tsconfig-paths`](https://www.npmjs.com/package/tsconfig-paths)
- [`typescript`](https://www.npmjs.com/package/typescript)

Feel free to contribute to this project. Every contribution will be appreciated.

## Hey, this project use to contain a backend generator!

Yes, it used to. But that approach has been deprecated in favor of my new backend framework, [Simba.js](https://www.npmjs.com/package/@anthonylzq/simba.js).

## Author

- **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).

## Contributors

- **Andree Anchi** - _Bug reports_ - [andreewaD](https://github.com/andreewD).
