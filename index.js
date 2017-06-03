const electron = require('electron')
const ipc = require('electron').ipcMain
const app = electron.app

const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.on('closed', function() {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('convert', (e, text, replaceWith) => {
  if(text === '') {
    electron.dialog.showMessageBox(mainWindow, {
      type: "error",
      title: "Error",
      message: "Please provide a text to convert!",
      buttons: ['OK']
    })
    return
  }

  if(replaceWith === '')
    replaceWith = '_'

  const converted = text.replace(/[aáàâäãāåboóòôöõō]/gi, replaceWith)

  mainWindow.webContents.send('converted text', converted)
})
