const {app, session, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  })

  win.loadURL('http://localhost:8000')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('ready', () => {
  session.defaultSession.loadExtension(path.join(__dirname, '../../helpers/vue-devtools'))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})