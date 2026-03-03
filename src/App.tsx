import { useEffect } from 'react'
import packageJson from "./../package.json"
import './App.css'

function App() {
  const {version} = packageJson;
  useEffect(() => {
    window.api.onUpdateAvailable((v) => {
      console.log(v)
    })
    window.api.checkUpdate()
  }, [])
  return (
    <>
      <div className='flex-row justify-center'>
        <h1 className='text-white'>Kiosk Project</h1>
        <p className='text-orange-500'>version {version}</p>
      </div>
    </>
  )
}

export default App
