import { useCallback, useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");

  const worker = createWorker();

  const convertImageToText = useCallback(async () => {
    if (!selectedImage) return;
    await worker.load();
    await worker.loadLanguage("mon");
    await worker.initialize("mon");
    const { data } = await worker.recognize(selectedImage);
    setTextResult(data.text);
  }, [worker, selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    } else {
      setSelectedImage(null);
      setTextResult("")
    }
  }

  return (
    <div className="App">
      <h2>OCR</h2>
      <div className="result">
        <div className="box-image">
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" height="410px" width="400px" />

          )} 
        </div>
    
      <div className="box-p">
        {textResult && (
          <p>{textResult}</p>
        )}
      </div>  
      </div>
      <div className="input-wrapper">
        <input type="file" id="upload" accept='image/*' onChange={handleChangeImage}/>
      </div>
    </div>
  );
}

export default App;
