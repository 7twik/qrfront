import { useState } from 'react'
import './App.css'
import axios from 'axios'
import QRCode from 'qrcode'
import Scan from './Scan'


function App() {
  const [count, setCount] = useState()
  const [url,setUrl]=useState("https://res.cloudinary.");
  const [email,setEmail]=useState()
  const [qr, setQr] = useState()
  const [success,setsuccess]=useState(false)
  const handleChange = (e) => {
    setCount(e.target.value)

  }
  const handleChange2 = (e) => {
    setEmail(e.target.value)

  }

  // With promises


// With async/await
const generateQR = async(text) => {
  const obj = {name: "text", profession: text, city: "New York"};
  const myJSON = JSON.stringify(obj);
  var qrr=await QRCode.toDataURL(myJSON,{type: "png"});
  setQr(qrr);
  try {

    const data = new FormData()
    data.append("file",qrr)
    data.append("upload_preset","notepad")
    data.append("cloud_name","dcyfkgtgv")
    setsuccess(true);
  console.log(await QRCode.toDataURL(text,{type: "png"}))
    const res= await fetch("https://api.cloudinary.com/v1_1/dcyfkgtgv/image/upload",{
        method:"post",
        body:data
    })
    const fil=await res.json();
    console.log(fil);
    setUrl(fil);
  }
  catch(err){
    console.log(err)
  } 
  
} 



  const click = async() => {
    generateQR(count);
    
  }
  const click2 = async() => {
    await axios
      .post('http://localhost:3000/api/form', {
        data: {email:email,qr:url.url},
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
    <h1>{count}</h1>
      <input type="text" placeholder="Enter your name" onChange={handleChange} />
      <button onClick={click}>Click</button>
      <input type="text" placeholder="Enter your Email" onChange={handleChange2} />
      <button onClick={click2}>Send Email</button>
      <br />
      {success && <div><img src={qr} alt="qr" /></div>}
      <br/>
      <Scan />
    </>
  )
}

export default App
