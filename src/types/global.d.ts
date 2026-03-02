export {}

declare global {
  interface Window {
    api: {
      checkUpdate: () => Promise<any>
      downloadUpdate: () => Promise<any>
      installUpdate: () => Promise<any>
      onLog: (cb: (msg: string) => void) => void
    }
  }
}