const writeFile = require('../utils/writeFile')

/**
 * @param {String} projectName
 * @returns {Promise<void>}
 */
module.exports = async projectName => {
  const data = {
    biomeContent: `{
  "$schema": "https://biomejs.dev/schemas/1.0.0/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "style": {
        "useConst": "error",
        "noParameterAssign": "off"
      },
      "correctness": {
        "noUnusedVariables": "error"
      },
      "suspicious": {
        "noExplicitAny": "off"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "quoteProperties": "asNeeded",
      "trailingCommas": "none",
      "semicolons": "asNeeded",
      "arrowParentheses": "asNeeded",
      "bracketSpacing": true
    }
  },
  "json": {
    "formatter": {
      "trailingCommas": "none"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
`,
    biomeFile: 'biome.json',
    biomeIgnoreContent: 'dist/',
    biomeIgnoreFile: '.biomeignore'
  }

  await Promise.all([
    writeFile(`${projectName}/${data.biomeFile}`, data.biomeContent),
    writeFile(`${projectName}/${data.biomeIgnoreFile}`, data.biomeIgnoreContent)
  ])
}
