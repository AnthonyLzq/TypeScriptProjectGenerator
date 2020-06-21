from io import open
from string import Template
from os import path, remove


def package_json(project_name, project_version):
    package_json_file = 'package.json'

    main_file = input('Main file (src/index.ts): ')
    main_file = 'src/index.ts' if main_file == '' else None

    author = input('Author: ')
    author_email = input('Email: ')

    license = input('License (MIT): ')
    license = 'MIT' if license == '' else None

    package_json_content = Template(f'''
\u007b
  "name": "$project_name",
  "version": "$project_version",
  "main": "$main_file",
  "scripts": \u007b
    "build:dev": "webpack --watch --mode development",
    "build": "webpack --mode production",
    "lint": "eslint src/* --ext .ts",
    "service": "nodemon",
    "start": "node dist/index.js"
  \u007d,
  "author": "$author <$author_email>",
  "license": "$license",
  "dependencies": \u007b\u007d,
  "devDependencies": \u007b\u007d
\u007d
''')

    package_json_content = package_json_content.substitute(
        project_name=project_name.replace(' ', '-'),
        project_version=project_version,
        main_file=main_file,
        author=author,
        author_email=author_email,
        license=license
    )

    with open(package_json_file, 'w') as f:
        f.write(package_json_content)
