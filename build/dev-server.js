const express = require('express')
const webpack = require('webpack')
const open = require('open')
const HttpProxyMiddleware = require('http-proxy-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./webpack.dev.conf')

const {merge} = require('webpack-merge')


var app = express()


var compiler = webpack(merge(webpackConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}))

const devMiddleware = WebpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
})

const hotMiddleware = WebpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000,
  quiet: true,
})

app.use(devMiddleware)
app.use(hotMiddleware)

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var port = 8000

var uri = `http://localhost:${port}`

devMiddleware.waitUntilValid(_ => {
  open(uri)
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}