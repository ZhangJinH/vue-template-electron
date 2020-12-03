const express = require('express')
const webpack = require('webpack')
const open = require('open')
const HttpProxyMiddleware = require('http-proxy-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const spawn = require('cross-spawn')
const chalk = require('chalk')

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

function createWindow () {
  const child = spawn('electron', ['.'])
  child.stdout.on('data', data => {
    electronLog(data, 'blue')
  })
  child.stderr.on('data', data => {
    electronLog(data, 'red')
  })
}

function electronLog(data, color) {
  let log = ''
  data.toString().split(/\r?\n/).forEach(line => {
    log += `\n${line}`
  })
  if (/[0-9A-z]+/.test(log)) {
    console.log(
      chalk[color].bold('┏ Electron -------------------') +
      log +
      chalk[color].bold('┗ ----------------------------')
    )
  }
}

var port = 8000

var uri = `http://localhost:8000`

devMiddleware.waitUntilValid(_ => {
  // open(uri)
  _resolve()
  createWindow()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}