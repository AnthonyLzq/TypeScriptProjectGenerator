# TypeScript project generator

## Version 0.1.0

- Project Initialization

## Version 0.1.1

- Fixed:
  - Now the script remembers its own directory, no matter where it is being executed.

## Version 0.1.2

- Fixed:
  - `nodemon.json` file is now been added once the script is executed.

## Version 0.2.0

- Implemented:
  - `eslint-plugin-sort-keys-fix` package to automatically sort the keys of an object.
- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 0.2.1

- Fixed:
  - `Webpack` config for `__dirname` according with this [`documentation`](https://codeburst.io/use-webpack-with-dirname-correctly-4cad3b265a92).

## Version 1.0.0

- Reworked:
  - All the process now is done using `Node.js` instead of `Python`.

## Version 1.1.0

- Updated:
  - [Documentation](https://github.com/AnthonyLzq/typescript-project-generator#readme).

## Version 1.1.1

- Fixed:
  - `bin/index.js` file, there was missing the following: 
    ```node
    #!/usr/bin/env node
    ```
    in the first line.

## Version 1.2.0

- Implemented:
  - `eol-last` eslint rule, to add an empty line a the end of a file.
  - `description` for the project.
  - Some code refactorization.
- Updated:
  - `.gitignore` file.