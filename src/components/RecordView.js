import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import VoiceUploadService from "../services/voiceupload.service";

const RecordView = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
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

  const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(mediaBlobUrl);

    reader.onload = () => resolve({
        fileName: mediaBlobUrl.title,
        base64: reader.result
    });
    reader.onerror = reject;
    file = reader
});

  const start = () => {
    let audio = new Audio(mediaBlobUrl);
    audio.play();
  };

  const submitVoice = () => {
    console.log(mediaBlobUrl);
    console.log(user.userId);

    const file = new File([mediaBlobUrl], "recordedVoice.mp3");
    VoiceUploadService.voiceUpload(file, user.userId).then(
      (data) => {
        console.log(data);
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

  return (
    <div
      class="container"
    
    >
      <div
        className="col-md-6 col-md-offset-3"
        style={{
          backgroundColor: "black",
          color: "white",
          marginLeft: "357px",
        }}
      >
        <div style={{ marginLeft: "20px", display: "flex" }}>
          <label
            style={{
              fontSize: "15px",
              fontWeight: "Normal",
              // marginTop: "20px"
            }}
            htmlFor="icon-button-file"
          >
            <h3 style={{ marginLeft: "15px", fontWeight: "normal" }}>
              Press the Start to record
            </h3>

            <div>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  backgroundColor: "#42b72a",
                  color: "white",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)",
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
                {isActive ? "Stop" : "Start"}
              </button>
              <button
                style={{
                  padding: "0.8rem 2rem",
                  border: "none",
                  backgroundColor: "#df3636",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)",
                }}
                onClick={start}
              >
                Play
              </button>

              <button
                style={{
                  backgroundColor: "black",
                  borderRadius: "8px",
                  color: "white",
                  padding: "0.8rem 2rem",
                  border: "none",
                  backgroundColor: "#f0f0f5",
                  marginLeft: "15px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  transition: "all 300ms ease-in-out",
                  transform: "translateY(0)",
                }}
                onClick={submitVoice}
              >
                Submit
              </button>
            </div>
          </label>
        </div>
        <b></b>
      </div>
    </div>
  );
};
export default RecordView;
