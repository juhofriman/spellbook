const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

const mode = 'development'
const outputPath = path.resolve(__dirname, 'dist')

const mainConfig = {
  mode,
  target: 'electron-main',
  entry: './src/index.ts',
  output: {
    path: outputPath,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'index.html' }
      ],
    }),
  ],
}

const rendererConfig = {
  mode,
  target: 'electron-renderer',
  entry: './src/preload.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: outputPath,
    filename: 'preload.js'
  }
}

module.exports = [mainConfig, rendererConfig]