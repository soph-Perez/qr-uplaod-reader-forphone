// import { useState } from 'react'
import QrUploader from "./components/QrUploader"
import './App.css'

function App() {
  return (
    <>
      <section id="center">
        <div>
          <h1>QR Code Scanner</h1>
          <QrUploader />
        </div>
      </section>
    </>
  )
}

export default App
