# TypeScript project generator

This project has the goal to create a basic setup for a `TypeScript` project. It will create many files that are usually created manually. Currently the following files are being created:

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
- ` Would you like to implement a express server with mongoose? [y/n]:`, yes or no question, only **y** or **n** is accepted. This is not case sensitive.

## What is new?

Please check the [`changelog.md`](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/changelog.md) file.

## With `express` or without it?

### Without `express`

A `src` folder will be created with the following structure:

```
📦src
 ┗ 📜index.ts
```

### With `express`

A `src` folder will be created with the following structure:

```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜user.ts
 ┣ 📂custom
 ┃ ┣ 📜error.ts
 ┃ ┣ 📜express.request.ts
 ┃ ┣ 📜express.response.ts
 ┃ ┣ 📜global.variables.ts
 ┃ ┗ 📜index.ts
 ┣ 📂dto-interfaces
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜user.dto.ts
 ┣ 📂models
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜user.ts
 ┣ 📂network
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜routes.ts
 ┃ ┗ 📜server.ts
 ┣ 📂routes
 ┃ ┣ 📜home.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜user.ts
 ┣ 📂utils
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜response.ts
 ┗ 📜index.ts
```

Some considerations:

- If you choose this option, now you are able to run a server that has one main route, `home` (`/`), and another one, `user` (`/user` or `/user/:userId`).
- To connect your server with your `MongoDB` database, you need to provide your `uri` in the `.env` and uncomment the indicated lines in the `src/network/server.ts` file.
- Once you have done that, now you can perform the following `HTTP REQUEST`: `GET`, `POST`, `PATCH` and `DELETE`.
- In order to use the global variable declared in the `src/custom/global.variables.ts` file, you have to add the following lines in the external file you want to use it:
  ```typescript
  import { CustomNodeJSGlobal } from "/direction/to/global.variables/file"

  declare const global: CustomNodeJSGlobal
  ```
  Now, your are able to use the global variable.
- The provided project structure is inspired in my personal experience as [`Node.js`](https://nodejs.org/en/) developer and the [`Nest`](https://nestjs.com/) framework.
- The server is fully tested and has no errors (at least for now), feel free to report one [here](https://github.com/AnthonyLzq/typescript-project-generator/issues).
- Support for windows and linux platforms is available.
- Check the content of those files, here:

  - [`with-express`](https://github.com/AnthonyLzq/typescript-project-generator/tree/master/lib/templates/with-express)
  - [`without-express`](https://github.com/AnthonyLzq/typescript-project-generator/tree/master/lib/templates/without-express)

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

### Optionals

As `devDependencies`:

- [`@types/express`](https://github.com/AnthonyLzq/typescript-project-generator/issues)
- [`@types/mongoose`](https://www.npmjs.com/package/@types/mongoose)
- [`@types/morgan`](https://www.npmjs.com/package/@types/morgan)

As `dependencies`:

- [`express`](https://expressjs.com/)
- [`mongoose`](https://mongoosejs.com/)
- [`morgan`](https://www.npmjs.com/package/morgan)

Feel free to contribute to this project. Every contribution will be appreciated.

## Author

- **Anthony Luzquiños** - _Initial Work_ - _Documentation_ - [AnthonyLzq](https://github.com/AnthonyLzq).
