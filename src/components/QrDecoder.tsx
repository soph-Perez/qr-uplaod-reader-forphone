import "../App.css"
import { useState, useEffect } from "react";
import {BrowserQRCodeReader} from "@zxing/browser";

type Props = {
    imageUrl: string | null;
  }

const QrDecoder = ({imageUrl}:Props) => {
  const [result, setResult] = useState<string | null>(null);
  useEffect(() => {
    if(!imageUrl) return;

    const codeReader = new BrowserQRCodeReader();
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      try{
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const result= await codeReader.decodeFromCanvas(canvas);
        setResult(result.getText());
        
      } catch (err) {
        setResult("No QR code found");
        console.log(err);
      }
    };
  }, [imageUrl])

  return(
    <div>
      <p>QR Result: {result ?? "No result yet"}</p>
    </div>
  );
}

export default QrDecoder;