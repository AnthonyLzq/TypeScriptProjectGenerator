from io import open
from os import path


def eslint():
    eslint_file = '.eslintrc.js'
    eslint_ignore_file = '.eslintignore'

    eslint_file_content = '''
module.exports = \u007b
  extends: [
    'eslint:recommended',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:typescript-sort-keys/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parser       : '@typescript-eslint/parser',
  parserOptions: \u007b
    ecmaFeatures: \u007b
      modules: true
    \u007d,
    ecmaVersion: 6,
    project    : './tsconfig.json',
    sourceType : 'module'
  \u007d,
  plugins: ['@typescript-eslint', 'typescript-sort-keys', 'sort-keys-fix'],
  rules  : \u007b
    '@typescript-eslint/camelcase'        : 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      \u007b
        selector: 'default',
        format  : ['camelCase']
      \u007d,
      \u007b
        selector: 'variable',
        format  : ['camelCase', 'PascalCase', 'UPPER_CASE']
      \u007d,
      \u007b
        selector         : 'parameter',
        format           : ['camelCase'],
        leadingUnderscore: 'allow'
      \u007d,
      \u007b
        selector         : 'memberLike',
        modifiers        : ['private'],
        format           : ['camelCase'],
        leadingUnderscore: 'require'
      \u007d,
      \u007b
        selector: 'typeLike',
        format  : ['PascalCase']
      \u007d
    ],
    '@typescript-eslint/semi'          : ['error', 'never'],
    'arrow-parens'                     : ['error', 'as-needed'],
    'comma-dangle'                     : ['error', 'never'],
    curly                              : ['error', 'multi'],
    'import/no-extraneous-dependencies': [
      'error', 
      \u007b
        'devDependencies': true
      \u007d
    ],
    'import/prefer-default-export': 'off',
    'key-spacing'                 : [2, \u007b align: 'colon' \u007d],
    'keyword-spacing'             : ['error', \u007b after: true, before: true \u007d],
    'lines-between-class-members' : [
      "error",
      "always",
      \u007b
        exceptAfterSingleLine: true
      \u007d
    ],
    'max-len': [
      'error',
      \u007b
        code                  : 80,
        ignoreComments        : true,
        ignoreRegExpLiterals  : true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreStrings         : true,
        ignoreUrls            : true
      \u007d
    ],
    'newline-before-return'      : 'error',
    'no-extra-parens'            : 'error',
    'no-console'                 : 'off',
    'no-param-reassign'          : 'off',
    'no-plusplus'                : 'off',
    'no-trailing-spaces'         : 'error',
    'no-underscore-dangle'       : [
      'error',
      \u007b
        'allowAfterThis'      : true,
        'enforceInMethodNames': false 
      \u007d
    ],
    'object-curly-spacing'       : ['error', 'always'],
    'prefer-const'               : 'error',
    radix                        : ['error', 'as-needed'],
    semi                         : [2, 'never'],
    'sort-keys'                  : 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
    'space-before-function-paren': [
      'error',
      \u007b
        anonymous : 'always',
        named     : 'always',
        asyncArrow: 'always'
      \u007d
    ]
  \u007d
\u007d
'''
    eslint_ignore_file_content = '''
/dist
.eslintrc.js
webpack.config.js
'''

    with open(eslint_file, 'w') as f:
        f.write(eslint_file_content)

    with open(eslint_ignore_file, 'w') as f:
        f.write(eslint_ignore_file_content)
