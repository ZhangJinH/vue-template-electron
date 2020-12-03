'use strict'

const {merge} = require('webpack-merge')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.conf')

const config = require('../config/index')
const utils = require('./utils')


Object.keys(baseConfig.entry).forEach(name => {
  baseConfig.entry[name] = ['./build/hot-reload'].concat([baseConfig.entry[name]])
})

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoader({
      sourceMap: true,
      usePostCSS: true
    })
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.base.title,
      template: 'index.ejs'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
})