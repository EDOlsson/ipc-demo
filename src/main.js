const electron = require('electron')

const countdown = require('./countdown')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

const windows = []

app.on('ready', _ => {
    [1, 2, 3].forEach(_ => {
        let w = new BrowserWindow({
            height:400,
            width:400
        })

        w.loadURL(`file://${__dirname}/countdown.html`)

        w.on('closed', _ => {
            w = null
        })

        windows.push(w)
    })
})

ipc.on('countdown-start', _ => {
    countdown(count => {
        console.log('count', count)
        windows.forEach(w => {
            w.webContents.send('countdown', count)
        })
    })
})