const webpack = require('webpack')

const rimraf = require('rimraf')

const config = require('./webpack.base.conf')

rimraf(config.output.path, (err) => {
  if (err) throw err

  webpack(config, (err, status) => {
    if (err) throw err
  
    if (status.hasErrors()) {
      console.log(`编译报错了`)
      console.log(status)
      process.exit(1)
    }
  
    console.log(`编译成功`)
  })
})

