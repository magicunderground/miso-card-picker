import { app, BrowserWindow } from 'electron'

let cardWindow = null

app.on('ready', () => {
    cardWindow = new BrowserWindow({
        darkTheme: true,
    })

    cardWindow.loadFile(__dirname + '/../index.html')

    cardWindow.on('closed', () => cardWindow = null)

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
})
