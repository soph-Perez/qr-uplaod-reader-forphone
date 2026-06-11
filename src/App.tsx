import './App.css'
import { useState } from 'react'
import ImagePreview from "./components/ImageViewer"
import QrUploader from "./components/QrUploader"
import QrDecoder from './components/QrDecoder'

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <>
      <section id="center">
        <div>
          <h1>QR Code Scanner</h1>
          <QrUploader setImageUrl={setImageUrl} />
          <ImagePreview imageUrl={imageUrl} />

          <QrDecoder imageUrl={imageUrl} />
        </div>
      </section>
    </>
  )
}

export default App
