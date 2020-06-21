from io import open
from os import path


def gitignore():
    gitignore_file = '.gitignore'

    gitignore_file_content = '''
node_modules
.vscode
.env
'''

    with open(gitignore_file, 'w') as f:
        f.write(gitignore_file_content)
