const { app, BrowserWindow, globalShortcut } = require("electron")
const { ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const path = require("path")

autoUpdater.autoDownload = false

function setupUpdater(win) {
  ipcMain.handle("update:check", async() => {
    await autoUpdater.checkForUpdates();
  })

  autoUpdater.on("checking-for-update", () => {
    win.webContents.send("log", "[updater] checking...")
  })

  autoUpdater.on("update-available", (info) => {
    win.webContents.send("log", `[updater] available: ${info.version}`)
  })

  autoUpdater.on("update-not-available", () => {
    win.webContents.send("log", "[updater] none")
  })

  autoUpdater.on("error", (e) => {
    win.webContents.send("log", `[updater] error: ${e}`)
  })
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false
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
  globalShortcut.register("F12", () => {
    if (win.isDestroyed()) return
    win.webContents.toggleDevTools()
  })

  // ✅ และเพิ่ม shortcut แบบ Chrome: Cmd+Option+I
  globalShortcut.register("CommandOrControl+Alt+I", () => {
    if (win.isDestroyed()) return
    win.webContents.toggleDevTools()
  })
}

app.whenReady().then(createWindow)
