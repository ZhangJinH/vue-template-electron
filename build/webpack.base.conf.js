'use strict'
const path = require('path')
const config = require('../config/index')

const VueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/rerender/app/index.js'
  },
  output: {
    path: config.base.assetsRoot,
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  resolve: {
    // 将rerender中的js require的 @ 指向至src目录
    alias: {
      '@': resolve('src/rerender')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        enforce: 'post',
        use: [
          {
            loader: 'html-loader',
            options: {
              attributes: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src'
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: VueLoaderConfig
        }]
      },
      // 图片loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[ext]',
              publicPath: './',
              limit: 10000,
              esModule: false
            }
          }
        ]
      },
      // 多媒体loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'media/[name].[ext]',
              publicPath: './',
              limit: 10000,
              esModule: false
            }
          }
        ]
      },
      // 字体loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              publicPath: './',
              name: 'font/[hash].[ext]',
              esModule: false
            }
          }
        ]
      }
    ]    
  },
  plugins: [
  ]
}