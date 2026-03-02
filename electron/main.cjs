const { app, BrowserWindow } = require("electron")
const { ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const path = require("path")

autoUpdater.autoDownload = false

function setupUpdater(win) {
  ipcMain.handle("update:check", () => autoUpdater.checkForUpdates())
  ipcMain.handle("update:download", () => autoUpdater.downloadUpdate())
  ipcMain.handle("update:install", () => autoUpdater.quitAndInstall())

  autoUpdater.on("checking-for-update", () => console.log("[updater] checking..."))
  autoUpdater.on("update-available", (info) => console.log("[updater] available:", info.version))
  autoUpdater.on("update-not-available", (info) => console.log("[updater] none:", info?.version))
  autoUpdater.on("download-progress", (p) => console.log("[updater] progress:", Math.round(p.percent)))
  autoUpdater.on("update-downloaded", (info) => console.log("[updater] downloaded:", info.version))
  autoUpdater.on("error", (e) => console.log("[updater] error:", e))
  // autoUpdater.on("update-available", () => win.webContents.send("update:available"))
  // autoUpdater.on("update-not-available", () => win.webContents.send("update:none"))
  // autoUpdater.on("download-progress", (p) => win.webContents.send("update:progress", p))
  // autoUpdater.on("update-downloaded", () => win.webContents.send("update:downloaded"))
  // autoUpdater.on("error", (e) => win.webContents.send("update:error", String(e)))
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs")
    }
  })

  const isDev = !app.isPackaged;
  setupUpdater(win)
  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "..", "dist", "index.html"));
  }

}

app.whenReady().then(createWindow)
