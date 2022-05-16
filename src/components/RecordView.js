import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import VoiceUploadService from "../services/voiceupload.service";
import { PlayFill, StopFill, MicFill, Upload } from 'react-bootstrap-icons';
import AlertMessage from "./AlertMessage";
const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isAlertShow, setIsAlertShow] = useState(false);
  let searchedItem;
  const user = AuthService.getCurrentUser();
  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 650);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  console.log("deed", mediaBlobUrl);

//   const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve({
//         fileName: mediaBlobUrl.title,
//         base64: reader.result
//     });
//     reader.onerror = reject;
//     file = reader
// });


  // const alert = alert.show('Recorded voice uploaded successfully', {
  //   timeout: 2000, // custom timeout just for this one alert
  //   type: 'success',
  //   onOpen: () => {
  //     console.log('hey')
  //   }, // callback that will be executed after this alert open
  //   onClose: () => {
  //     console.log('closed')
  //   } // callback that will be executed after this alert is removed
  // });


  const start = () => {
    let audio = new Audio(mediaBlobUrl);
    audio.play();
  };

  // const callBlob = async(mediaBlobUrl) => {
  //   const audioBlob = await fetch(mediaBlobUrl).then(r => r.blob());
  //   return audioBlob;
  // };

  const submitVoice = () => {
    console.log(mediaBlobUrl);
    console.log(user.userId);
    //let blobarr = callBlob(mediaBlobUrl);
    const file = new File([mediaBlobUrl], "recordVoice.wav");
    console.log(file)
    VoiceUploadService.voiceUpload(file, user.userId).then(
      (data) => {
        console.log(data);
        setIsAlertShow(true)
       
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  const onAlertMessageClose = ()=>{
    setIsAlertShow(false)
  }

  return (
    
    <div className="mt-4">
      <h2 className="text-center"> Voice Recorder</h2>
    <button className="c-button"
      style={{
        backgroundColor: "#42b72a",
      }}
      onClick={() => {
        if (!isActive) {
          startRecording();
        } else {
          stopRecording();
          stopTimer();
        }

        setIsActive(!isActive);
      }}
    >
      {isActive ? 
      <><span className="d-none d-sm-inline">Stop</span> <StopFill /></>: 
      <> <span className="d-none d-sm-inline">Record</span> <MicFill /></>
      }
     
    </button>
    <button className="c-button"
      style={{
        backgroundColor: "#df3636",
      }}
      onClick={start}
    >
      <span className="d-none d-sm-inline">Listen</span> <PlayFill  fontWeight={700} />
    </button>

    <button className="c-button"
      style={{
        backgroundColor: "black",
        
      }}
      onClick={submitVoice}
    >
      <span className="d-none d-sm-inline">Save</span>  <Upload/>
    </button>
    <div className="container"   style={{ marginTop: "50px", paddingBottom: "10px"}}>
    {isAlertShow && (<AlertMessage message = "Voice saved successfully" handleClose = {() => onAlertMessageClose()}></AlertMessage>)}
    </div>
  </div>
  );
};
export default RecordView;
