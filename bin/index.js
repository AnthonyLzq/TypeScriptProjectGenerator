#!/usr/bin/env node

// Check Node.js version before proceeding
const nodeVersion = process.version
const nodeMajorVersion = process.version.match(/^v(\d+)/)[1]

if (nodeMajorVersion < 18) {
  console.error(`❌ TPG requires Node.js 18 or higher. Current version: ${nodeVersion}`)
  console.error('Please upgrade Node.js: https://nodejs.org/')
  process.exit(1)
}

const main = require('../lib/index.js')

main()
