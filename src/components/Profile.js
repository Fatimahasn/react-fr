import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
const WebcamComponent = () => <Webcam />
const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: 'user',
  
}
const Profile=()=>{
    const [imageData, setImageData] = useState(null);
    const [userName, setUserName] = useState('');
    const [saveImage, setSaveImage] = useState(false);
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setImageData(pictureSrc);
    })

    const onClickRetake=(e)=>{
        e.persist();
        setImageData(null);
    }
    const onClickSave=(e)=>{
        e.persist();
        setSaveImage(!saveImage);
        return;
    }

    const handleChange=(e)=>{
        e.persist();
        setUserName(e.target.value);
    }

    const handleSaveSubmit=(e)=>{
        e.preventDefault();
        let imageObject ={
            userName: userName,
            imageData: imageData
        }
        console.log(imageObject)
        axios.post("http://10.0.8.211:4000/api/recognizeImage/img",imageObject)
        .then(()=>{console.log("Sent")})
        // prop.saveJobImage(imageObject)

    }
  return (
    <div>
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
           />
           <div className='button-container'><button onClick={capture}>Capture</button></div>
           {imageData ?
            <div>
                 <p><img src={imageData} alt=""/></p>
                 <span><button onClick={onClickRetake}>Retake?</button></span>
                 <span><button onClick={onClickSave}>Save</button></span>
                 {saveImage?
                 <div>
                 <form onSubmit= {handleSaveSubmit}>
                     <p>
                         <label>Image name: </label>
                         <input type="text"
                           name="userName"
                           onChange={handleChange}/>
                         <input type ="submit" value ="Save"/>
                     </p>
                 </form>
             </div>
                 :null}
            </div> :  null
           } 
           </div>
           )          
      
}
export default Profile;