# TypeScript project generator

## Version 2.0.0
- Implemented:
  - A new feature that allows you to build a server with [`express`](https://expressjs.com/) and [`mongoose`](https://mongoosejs.com/).
  - New templates, one that has the `express` server, and that doesn't has it. One folder is called `lib/new-templates/with-express` and the other one is called `lib/new-templates/without-express`.
  - Minor errors in the indentation where fixed.
  - Now the project description is added into the `readme.md` file.

## Version 1.8.0
- Implemented:
  - Some code modularization.

## Version 1.7.0
- Implemented:
  - A progress bar using [`cli-progress`](https://www.npmjs.com/package/cli-progress) and [`colors`](https://www.npmjs.com/package/colors).
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).
  - [package.json](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/package.json).

## Version 1.6.0
- Implemented:
  - Request in [`#3`](https://github.com/AnthonyLzq/typescript-project-generator/issues/3).
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.5.0
- Implemented:
  - Request in [`#2`](https://github.com/AnthonyLzq/typescript-project-generator/issues/2).
  - Prompt messages when the user made a mistake.
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).
  - [package.json](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/package.json).

## Version 1.4.0
- Implemented:
  - `LICENSE` generator using a query to this [page](https://choosealicense.com/licenses/).
  - [`underscore`](https://www.npmjs.com/package/underscore) to clean the HTML gotten in the query.
  - `LICENSE` file, both in the current project and in the `templates` folder.
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.3.1

- Fixed:
  - [Changelog](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/changelog.md).
- Updated:
  - [`package.json`](https://github.com/AnthonyLzq/typescript-project-generator/blob/master/package.json).

## Version 1.3.0

- Implemented:
  - [`readline-sync`](https://www.npmjs.com/package/readline-sync) native methods in order to have cleaner code.
- Updated:
  - `.gitignore` file, using [this](https://www.toptal.com/developers/gitignore/api/node,yarn).
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.2.1

- Fixed:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.2.0

- Implemented:
  - `eol-last` eslint rule, to add an empty line a the end of a file.
  - `description` for the project.
  - Some code refactorization.
- Updated:
  - `.gitignore` file.

## Version 1.1.1

- Fixed:
  - `bin/index.js` file, there was missing the following: 
    ```node
    #!/usr/bin/env node
    ```
    in the first line.

## Version 1.1.0

- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.0.0

- Reworked:
  - All the process now is done using `Node.js` (with [`readline-sync`](https://www.npmjs.com/package/readline-sync)) instead of `Python`.

## Version 0.2.1

- Fixed:
  - `Webpack` config for `__dirname` according with this [`documentation`](https://codeburst.io/use-webpack-with-dirname-correctly-4cad3b265a92).

## Version 0.2.0

- Implemented:
  - `eslint-plugin-sort-keys-fix` package to automatically sort the keys of an object.
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 0.1.2

- Fixed:
  - `nodemon.json` file is now been added once the script is executed.

## Version 0.1.1

- Fixed:
  - Now the script remembers its own directory, no matter where it is being executed.

## Version 0.1.0

- Project Initialization
