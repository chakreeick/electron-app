const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
  checkUpdate: () => ipcRenderer.invoke("update:check"),
  downloadUpdate: () => ipcRenderer.invoke("update:download"),
  installUpdate: () => ipcRenderer.invoke("update:install"),
  onLog: (cb) => ipcRenderer.on("log", (_e, msg) => cb(msg)),
  onUpdateAvailable: (cb) =>
    ipcRenderer.on("update:available", (_e, v) => cb(v)),
  onUpdateNone: (cb) =>
    ipcRenderer.on("update:none", cb),
  onUpdateProgress: (cb) =>
    ipcRenderer.on("update:progress", (_e, p) => cb(p)),
  onUpdateDownloaded: (cb) =>
    ipcRenderer.on("update:downloaded", cb),
  onUpdateError: (cb) =>
    ipcRenderer.on("update:error", (_e, err) => cb(err)),
})