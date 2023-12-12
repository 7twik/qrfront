import React,{useState, useRef} from "react"

import  QrReader  from 'react-qr-reader';
function Scan(){
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const qrRef = useRef(null);
  const [data,setData]=useState("yoooooooooooooooooo");

 
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
    <div>
        <button color="secondary" onClick={onScanFile}>Scan Qr Code</button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Code: {scanResultFile}</h3>
                      
                         <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>

      <p>{data}</p>
    </div>
  )
}

export default Scan;