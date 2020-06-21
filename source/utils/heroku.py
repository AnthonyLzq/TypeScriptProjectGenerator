from io import open
from os import path


def heroku():
    heroku_file = 'heroku.yml'

    heroku_file_content = '''
build:
  docker:
    web: Dockerfile
'''

    with open(heroku_file, 'w') as f:
        f.write(heroku_file_content)
