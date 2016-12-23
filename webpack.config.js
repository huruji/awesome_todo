const path = require('path')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = {
  entry: {
    user: path.join(__dirname, 'src', 'user.js'),
    //intro: path.join(__dirname, 'src', 'intro.js'),
    loginAndJoin: path.join(__dirname, 'src', 'loginAndJoin.js')
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8888'
    })
  ],
  module: {
    preLoaders: [
      {
        test:/\.js$/, 
        exclude: /node_modules/, 
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test:/\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel'
      },
      {
        test:/\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  }
}
