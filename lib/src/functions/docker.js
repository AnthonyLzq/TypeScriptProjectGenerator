const writeFile = require('../utils/writeFile')

module.exports = async () => {
  const data = {
    docker: {
      content: `FROM node:16-alpine

WORKDIR /app

COPY . ./

RUN yarn install --prod

RUN yarn add webpack webpack-node-externals tsconfig-paths-webpack-plugin -D

RUN yarn build

RUN yarn remove webpack webpack-node-externals tsconfig-paths-webpack-plugin

COPY dist ./dist

CMD [ "yarn", "start" ]
`,
      file: 'Dockerfile'
    },
    dockerignore: {
      content: `.eslintrc
.eslintignore

.git
.gitignore
.github

node_modules

*.md
LICENSE

jest.config.ts
nodemon.json
*.log
`,
      file: '.dockerignore'
    }
  }

  await Promise.all([
    writeFile(data.docker.file, data.docker.content),
    writeFile(data.dockerignore.file, data.dockerignore.content)
  ])
}
