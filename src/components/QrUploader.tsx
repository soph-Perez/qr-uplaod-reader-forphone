import "../App.css"
import { useState } from "react";

type Props = {
  setImageUrl: (url: string | null) => void;
};

const QrUploader = ({setImageUrl}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const chosenFile = event.target.files?.[0];
    if (!chosenFile) {
      setSelectedFile(null);
      setImageUrl(null);
      return;
    }

    setSelectedFile(chosenFile);

    const url = URL.createObjectURL(chosenFile);
    setImageUrl(url);
  }

  function clearSelectedFile(){
    setSelectedFile(null);
    setImageUrl(null);
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