from io import open
from os import path


def docker():
    docker_file = 'Dockerfile'

    docker_file_content = '''
FROM node: lts

WORKDIR / app

COPY package.json ./

RUN yarn install - -prod

copy dist / app/dist

CMD [ "yarn", "start" ]
'''

    with open(docker_file, 'w') as f:
        f.write(docker_file_content)
