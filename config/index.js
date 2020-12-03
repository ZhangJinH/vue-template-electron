const path = require('path')

module.exports = {
  base: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    title: 'vue-template-electron'
  },
  build: {
    showAnalyse: false
  }
}