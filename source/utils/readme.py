from io import open
from os import path


def readme(project_name):
    readme_file = 'readme.md'

    readme_file_content = '# {}\n'.format(project_name.title())

    with open(readme_file, 'w') as f:
        f.write(readme_file_content)
