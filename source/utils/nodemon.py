from io import open
from os import path


def nodemon():
    nodemon_file = 'nodemon.json'

    nodemon_file_content = '''
\u007b
  "watch": [
    "src"
  ],
  "ext": "ts",
  "ignore": [
    "src/**/*.test.ts"
  ],
  "exec": "ts-node -r dotenv/config ./src/index"
\u007d
'''

    with open(nodemon_file, 'w') as f:
        f.write(nodemon_file_content)
