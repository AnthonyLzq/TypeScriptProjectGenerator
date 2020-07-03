# TypeScript project generator

This project has the goal to create a basic setup for a TypeScript project. It will create many files that are usually created manually. Currently the following files are being created:

- `.env`
- `.eslintignore`
- `.eslintrc.js`
- `.gitignore`
- `.prettier`
- `changelog.md`
- `Dockerfile`
- `heroku.yml` (optional)
- `LICENSE` (`MIT` as example)
- `nodemon.json`
- `package.json`
- `readme.md`
- `tsconfig.json`
- `webpack.config.js`

Additionally, a `src` folder will be created with an `ìndex.ts` file in it.

Finally, `git` will be initialized and a list of libraries will be installed. Check the [**notes**](#notes).

## Prerequisites

You need to have internet connection to get the license from this [web page](https://choosealicense.com/licenses/).

## Installation

This project was intended to be installed globally, **not locally**, and also to initialize projects, be aware of that, you may broke something in your current working directory.

In order to install this package, run the following command in your terminal:

```console
npm i -g typescript-project-generator
```

## Usage

Once you have installed the package, please run the following command in your terminal:

```console
tpg
```

This will create a replica of the content of the [`lib/templates`](https://github.com/AnthonyLzq/typescript-project-generator/tree/master/lib/templates) folder. Notice that the `.env` file is not there because is being ignored by the `.gitignore` file.

## <a name="notes"></a>Notes

Here is the list of the packages that are being installed:

- [`@types/node`](https://www.npmjs.com/package/@types/node)
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`eslint`](https://www.npmjs.com/package/eslint)
- [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier)
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import)
- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)
- [`eslint-plugin-sort-keys-fix`](https://www.npmjs.com/package/eslint-plugin-sort-keys-fix)
- [`eslint-plugin-typescript-sort-keys`](https://www.npmjs.com/package/eslint-plugin-typescript-sort-keys)
- [`nodemon`](https://www.npmjs.com/package/nodemon)
- [`prettier`](https://www.npmjs.com/package/prettier)
- [`ts-loader`](https://www.npmjs.com/package/ts-loader)
- [`ts-node`](https://www.npmjs.com/package/ts-node)
- [`typescript`](https://www.npmjs.com/package/typescript)
- [`webpack`](https://www.npmjs.com/package/webpack)
- [`webpack-cli`](https://www.npmjs.com/package/webpack-cli)
- [`webpack-node-externals`](https://www.npmjs.com/package/webpack-node-externals)

Feel free to contribute to this project. Every contribution will be appreciated.

## Author
-   **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
