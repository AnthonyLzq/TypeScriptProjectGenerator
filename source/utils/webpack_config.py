from io import open
from os import path


def webpack():
    webpack_file = 'webpack.config.js'

    webpack_file_content = '''
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  entry  : './src/index.ts',
  externals: [nodeExternals()],
  module : {
    rules: [
      {
        exclude: /node_modules/,
        test   : /\.ts$/,
        use    : {
          loader: 'ts-loader'
        },
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename  : 'index.js',
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  target: 'node'
}

'''

    with open(webpack_file, 'w') as f:
        f.write(webpack_file_content)
