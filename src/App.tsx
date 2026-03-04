import { useEffect, useState } from 'react'
import packageJson from "./../package.json"
import './App.css'

function App() {
  const {version} = packageJson;
  const [status, setStatus] = useState<"idle" | "available" | "downloading" | "downloaded">("idle")
  const [progress, setProgress] = useState(0)
  const [ver, setVer] = useState(version)
  useEffect(() => {
    window.api.onLog((msg) => {
      console.log(msg)
    })
    window.api.checkUpdate()
    window.api.onUpdateAvailable((v) => {
      setVer(v)
      setStatus("available")
    })
    window.api.onUpdateProgress((p) => {
      setProgress(p)
      setStatus("downloading")
    })
    window.api.onUpdateDownloaded(() => {
      setStatus("downloaded")
    })

    window.api.onUpdateNone(() => {
      console.log("No update")
    })
  }, [])
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-white'>Kiosk Project</h1>
      <p className='text-orange-500'>Version : {ver}</p>
      {status === "available" && (
        <button type='button' className='bg-orange-500 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={() => window.api.downloadUpdate()}>
          Download v{ver}
        </button>
      )}

      {status === "downloading" && (
        <p className='text-white'>Downloading… {progress}%</p>
      )}

      {status === "downloaded" && (
        <button type='button' className='bg-orange-500 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-700 text-white font-bold py-2 px-4 rounded' onClick={() => window.api.installUpdate()}>
          Install & Restart
        </button>
      )}
      </div>
    </>
  )
}

export default App
