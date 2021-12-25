# TypeScript project generator

This project has the goal to create a basic setup for a `TypeScript` project. It will create many files that are usually created manually. Currently the following files are being created:

- `.env`
- `.eslintignore`
- `.eslintrc`
- `.gitignore`
- `CHANGELOG.md`
- `Dockerfile`
- `heroku.yml` (optional)
- `LICENSE` (`MIT` as example)
- `nodemon.json`
- `package.json`
- `README.md`
- `tsconfig.base.json`
- `tsconfig.json`
- `webpack.config.js`

The following questions will be asked to the user:

- `Yarn or npm?`, only one of them is valid.
- `Project name:`, at least one character must be provided.
- `Project description:`, at least one character must be provided.
- `Author:`, at least one character must be provided.
- `Email:`, a correct email address must be provided.
- `Project version (0.1.0):` the initial version of the project, `0.1.0` as default.
- `Select your license [1...7]:`, the license you have chosen for the project.
- `License year (current year):`, the year where your license starts, current year as default.
- `Will this project be deployed with Heroku? [y/n]:`, yes or no question, only **y** or **n** is accepted. This is not case sensitive.

## What is new?

Please check the [`changelog.md`](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/changelog.md) file.

## Project structure

```
📂src
 ┗ 📜index.ts
📜.env
📜.eslintignore
📜.eslintrc
📜.gitignore
📜CHANGELOG.md
📜Dockerfile
📜heroku.yml
📜LICENSE
📜nodemon.json
📜package.json
📜README.md
📜tsconfig.base.json
📜tsconfig.json
📜webpack.config.js
📜yarn.lock (or package-lock.json)
```

Some considerations:

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
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`eslint`](https://www.npmjs.com/package/eslint)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier)
- [`eslint-config-standard`](https://www.npmjs.com/package/eslint-config-standard)
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import)
- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)
- [`nodemon`](https://www.npmjs.com/package/nodemon)
- [`prettier`](https://www.npmjs.com/package/prettier)
- [`ts-loader`](https://www.npmjs.com/package/ts-loader)
- [`ts-node`](https://www.npmjs.com/package/ts-node)
- [`tsconfig-paths`](https://www.npmjs.com/package/tsconfig-paths)
- [`tsconfig-paths-webpack-plugin`](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin)
- [`typescript`](https://www.npmjs.com/package/typescript)
- [`webpack`](https://www.npmjs.com/package/webpack)
- [`webpack-cli`](https://www.npmjs.com/package/webpack-cli)
- [`webpack-node-externals`](https://www.npmjs.com/package/webpack-node-externals)

Feel free to contribute to this project. Every contribution will be appreciated.

## Hey, this project use to contain a backend generator!

Yes, it used to. But that approach has been deprecated in favor of my new backend framework, [Simba.js](https://www.npmjs.com/package/@anthonylzq/simba.js).

## Author

- **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).