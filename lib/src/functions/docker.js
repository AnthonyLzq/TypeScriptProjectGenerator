const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @param {'yarn add'|'npm i'|'pnpm i'} manager
 * @returns {Promise<void>}
 */
module.exports = async (projectName, manager) => {
  const managerName = manager.split(' ')[0]
  const nodeMajorVersion = process.version.match(/^v(\d+)/)[1]

  const data = {
    docker: {
      content: `FROM node:${nodeMajorVersion}-alpine
${managerName === 'pnpm' ? '\nRUN corepack enable\n' : ''}
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ${managerName === 'yarn' ? 'yarn.lock' : managerName === 'pnpm' ? 'pnpm-lock.yaml' : 'package-lock.json'} ./
RUN ${managerName === 'yarn' ? 'yarn install --frozen-lockfile' : managerName === 'npm' ? 'npm ci' : 'pnpm install --frozen-lockfile'}

# Copy source and build
COPY . .
RUN ${managerName === 'yarn' ? 'yarn build' : managerName === 'npm' ? 'npm run build' : 'pnpm build'}

EXPOSE 3000
CMD ["node", "dist/index.js"]`,
      file: 'Dockerfile'
    },
    dockerignore: {
      content: `# Git files
.git
.gitignore
.github

# Dependencies
node_modules

# Build artifacts
dist
coverage

# Configuration files (development)
biome.json
.biomeignore
jest.config.ts
tsconfig*.json
.env.example

# Documentation
*.md
LICENSE
CHANGELOG.md

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# IDE
.vscode
.idea

# OS
.DS_Store
Thumbs.db

# Test files
test/
*.test.ts
*.test.js
*.spec.ts
*.spec.js`,
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
