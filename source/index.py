from utils.package_json import package_json
from utils.prettier import prettier
from utils.tsconfig import tsconfig
from utils.eslint import eslint
from utils.webpack_config import webpack
from utils.readme import readme
from utils.changelog import changelog
from utils.gitignore import gitignore
from utils.docker import docker
from utils.heroku import heroku
from utils.nodemon import nodemon

if __name__ == '__main__':
    project_name = input('Project name: ').lower()
    while(project_name == ''):
        project_name = input('Project name: ').lower()

    project_version = input('Project version (0.1.0): ')
    project_version = '0.1.0' if project_version == '' else None

    heroku_validator = input('Will this project use Heroku? (y/n): ').lower()
    while heroku_validator != 'y' and heroku_validator != 'n':
        print('Invalid option')
        heroku_validator = input(
            'Will this project use Heroku? (y/n): ').lower()

    package_json(project_name, project_version)
    readme(project_name)
    changelog(project_name, project_version)
    gitignore()
    tsconfig()
    nodemon()
    prettier()
    eslint()
    webpack()
    docker()
    if heroku_validator == 'y':
        heroku()
