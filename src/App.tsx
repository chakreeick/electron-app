import { useEffect, useState } from 'react'
import packageJson from "./../package.json"
import './App.css'

function App() {
  const {version} = packageJson;
  const [isDownload,setIsDownload] = useState({
    loading : true,
    updateAvailable : false,
    alreadyDownload : false
  })
  useEffect(() => {
    window.api.onLog((msg) => {
      console.log(msg)
    })
    window.api.checkUpdate()
    window.api.onUpdateAvailable((v) => {
      setIsDownload({
        loading : false,
        updateAvailable : v === version,
        alreadyDownload : false
      })
    })
    window.api.onUpdateProgress((p) => {
      console.log(p)
    })
    window.api.onUpdateDownloaded(() => {
      setIsDownload({
        ...isDownload,
        alreadyDownload : true
      })
    })

    window.api.onUpdateNone(() => {
      console.log("No update")
    })
  }, [])
  if(isDownload.loading){
    return <></>
  }
  return (
    <>
      <div className='flex-row justify-center'>
        <h1 className='text-white'>Kiosk Project</h1>
        <p className='text-orange-500'>version {version}</p>
        {
          isDownload.alreadyDownload ? <button onClick={() => window.api.installUpdate()} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                Install & Restart
              </button> : 
          <>
            {
              isDownload.updateAvailable ?
              <p className='text-white'>This version is latest.</p> : 
              <button onClick={() => window.api.downloadUpdate()} className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                Download
              </button>
            }
          </>
        }
      </div>
    </>
  )
}

export default App
