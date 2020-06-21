# TypeScript project generator

This project has the goal to create a basic setup for a TypeScript project. It will create many files that are usually created manually. Currently the following files are being created:

- `package.json`
- `readme.md`
- `changelog.md`
- `.gitignore`
- `tsconfig.json`
- `.eslintrc.js`
- `.eslintignore`
- `.prettier`
- `Dockerfile`
- `nodemon.json`
- `webpack.config.js`
- `heroku.yml` (optional)

Additionally, a `src` folder will be created with an `ìndex.ts` file in it.

Finally, `git` will be initialized and a list of libraries will be installed. Check the [**notes**](#notes).

## Prerequisites

Once you have cloned this project, please run the following command in your terminal:

```console
$ chmod u+x ts.config.sh
```

## Usage

You only need to run the following command to create the setup:

```console
$ ./ts.config.sh
```

## <a name="notes"></a>Notes

Here is the list of the packages that are been installed:

- [`@types/node`](https://www.npmjs.com/package/@types/node)
- [`@typescript-eslint/eslint-plugin`](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
- [`@typescript-eslint/parser`](https://www.npmjs.com/package/@typescript-eslint/parser)
- [`dotenv`](https://www.npmjs.com/package/dotenv)
- [`eslint`](https://www.npmjs.com/package/eslint)
- [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
- [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier)
- [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import)
- [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)
- [`eslint-plugin-typescript-sort-keys`](https://www.npmjs.com/package/eslint-plugin-typescript-sort-keys)
- [`nodemon`](https://www.npmjs.com/package/nodemon)
- [`prettier`](https://www.npmjs.com/package/prettier)
- [`ts-loader`](https://www.npmjs.com/package/ts-loader)
- [`ts-node`](https://www.npmjs.com/package/ts-node)
- [`typescript`](https://www.npmjs.com/package/typescript)
- [`webpack`](https://www.npmjs.com/package/webpack)
- [`webpack-cli`](https://www.npmjs.com/package/webpack-cli)
- [`webpack-node-externals`](https://www.npmjs.com/package/webpack-node-externals)

Finally, check the structure generated once you run the command on the `source/templates` folder.

Feel free to contribute to this project. Every contribution will be appreciated.

### Why Python?

This is something related to my personal preferences. It found kind of hard receive parameters by console using [`Node.js`](https://nodejs.org/en/). In the order hand, using [`Python`](https://www.python.org/) to get information from the console is easier, so...

## Author
-   **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
