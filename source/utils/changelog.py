from io import open
from os import path


def changelog(project_name, project_version):
    changelog_file = 'changelog.md'

    changelog_file_content = '# {}\n\n## Version {}\n\n- Project Initialization'.format(
        project_name.title(),
        project_version.title()
    )

    with open(changelog_file, 'w') as f:
        f.write(changelog_file_content)
