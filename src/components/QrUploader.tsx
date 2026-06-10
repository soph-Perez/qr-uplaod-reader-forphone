import "../App.css"
import { useState } from "react";

const QrUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const chosenFile = event.target.files?.[0];
    if (chosenFile==undefined || chosenFile==null){
      setSelectedFile(null);
    } else {
      setSelectedFile(chosenFile);
    }
  }

  function clearSelectedFile(){
    setSelectedFile(null);
  }
  return(
    <div className="file-upload">
      <label className="upload-button">
        Choose File
        <input type='file' accept='image/*' onChange={handleFileSelection}></input>
      </label>
      
      {selectedFile && (
        <div className="file-row">
          <p className="file-name">{selectedFile.name}</p>
          <button className="x-button" onClick={clearSelectedFile}>X</button>
        </div>
      )}
    </div>
  )
}

export default QrUploader;