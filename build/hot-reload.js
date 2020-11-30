var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(e => {
  if (e.action === 'reload') {
    window.location.reload()
  }
})

