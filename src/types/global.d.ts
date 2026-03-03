export {}

declare global {
  interface Window {
    api: {
      checkUpdate: () => Promise<any>
      downloadUpdate: () => Promise<any>
      installUpdate: () => Promise<any>
      onLog: (cb: (msg: string) => void) => void
      onUpdateAvailable(cb: (v: string) => void): void
      onUpdateNone(cb: () => void): void
      onUpdateProgress(cb: (p: number) => void): void
      onUpdateDownloaded(cb: () => void): void
      onUpdateError(cb: (e: string) => void): void
    }
  }
}