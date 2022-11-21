const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @param {'yarn add'|'npm i'|'pnpm i'} manager
 * @returns {Promise<void>}
 */
module.exports = async (projectName, manager) => {
  const managerName = manager.split(' ')[0]

  const data = {
    docker: {
      content: `FROM node:18-alpine

WORKDIR /app

COPY . ./

RUN ${manager} --prod

RUN ${manager} webpack webpack-node-externals tsconfig-paths-webpack-plugin -D

RUN ${
        managerName === 'yarn'
          ? 'yarn'
          : managerName === 'npm'
          ? 'npm run'
          : 'pnpm'
      } build

RUN ${
        managerName === 'yarn'
          ? 'yarn remove'
          : managerName === 'npm'
          ? 'npm uninstall'
          : 'pnpm remove'
      } webpack webpack-node-externals tsconfig-paths-webpack-plugin

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
*.log
`,
      file: '.dockerignore'
    }
  }

  await Promise.all([
    writeFile(`${projectName}/${data.docker.file}`, data.docker.content),
    writeFile(
      `${projectName}/${data.dockerignore.file}`,
      data.dockerignore.content
    )
  ])
}
