const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: require('./webpack.rules.cjs'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@': path.resolve(__dirname, '..', 'src')
    },
  },
  externals: {
    electron: 'commonjs electron'
  },
};