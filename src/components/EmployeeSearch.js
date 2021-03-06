import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import { PlayFill, RecordBtn } from "react-bootstrap-icons";
import VoiceReset from "../services/voicereset.service";
import { withAlert } from "react-alert";
import Alert from "./AlertMessage";
import AlertMessage from "./AlertMessage";

export default function EmployeeSearch() {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isAlertShow, setIsAlertShow] = useState(false);
  useEffect(() => {
    axios
      .get(
        "https://namepronounciation-tool.azurewebsites.net/cheetah/getAllEmployees"
      )
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  const start = (media) => {
    media = media + "&xyz=" + new Date();
    console.log(media);
    let audio = new Audio(media);
    audio.play();
  };

  // const alert = alert.show('Voice reset successfully', {
  //   timeout: 2000, // custom timeout just for this one alert
  //   type: 'success',
  //   onOpen: () => {
  //     console.log('hey')
  //   }, // callback that will be executed after this alert open
  //   onClose: () => {
  //     console.log('closed')
  //   } // callback that will be executed after this alert is removed
  // });

  const searchData = (value) => {
    setSearchTerm(value);
    if (searchTerm !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };
  const resetData = (username) => {
    VoiceReset.voiceReset(username).then(
      (data) => {
        console.log(data);
        <Alert alert=" Message" />;

        if (APIData != null) {
          APIData.filter((i) => i.userId === username).map(
            (m) => (m.recordUrl = data.recordUrl)
          );
        }
        if (filteredResults != null) {
          filteredResults
            .filter((i) => i.userId === username)
            .map((m) => (m.recordUrl = data.recordUrl));
        }
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
    <div className="container mt-4">
      <Input
        style={{ paddingTop: "10px", paddingBottom: "10px"}}
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchData(e.target.value)}
      />
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
        {searchTerm.length > 1
          ? filteredResults.map((item) => {
              return (
                <div className="c-card">
                  <div class="row">
                    <div class="col-sm">
                      <img
                        src={item.imageUrl}
                        className="card-img-top m-1 p-1 "
                        alt="profile picture"
                        style={{
                          width: "100px",
                          height: "100px",
                          background: "lightred",
                        }}
                      />
                      <div style={{padding:"10px"}}>
                      <p>{item.userId}</p>

                      <p>{item.name}</p>
                      <p>{item.email}</p>
                      </div >
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <button
                        className="c-button play-btn"
                        onClick={() => start(item.recordUrl)}
                      >
                        Play <PlayFill />
                      </button>
                      <button
                        className="c-button play-btn"
                        onClick={() => resetData(item.userId)}
                      >
                        Reset Voice <PlayFill />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : APIData.map((item) => {
              return (
                <div className="c-card">
                  <div class="row">
                    <div class="col-sm">
                      <img
                        src={item.imageUrl}
                        className="card-img-top m-1 p-1 "
                        alt="profile picture"
                        style={{
                          width: "100px",
                          height: "100px",
                          background: "lightred",
                        }}
                      />
                      <p>{item.userId}</p>

                      <p>{item.name}</p>
                      <p>{item.email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm">
                      <button
                        className="c-button play-btn"
                        onClick={() => start(item.recordUrl)}
                      >
                        Play <PlayFill />
                      </button>
                      <button
                        className="c-button play-btn"
                        onClick={() => resetData(item.userId)}
                      >
                        Reset Voice <RecordBtn />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="container"   style={{ marginTop: "50px", paddingBottom: "10px"}}>
    {isAlertShow && (<AlertMessage message = "Voice saved successfully" handleClose = {() => onAlertMessageClose()}></AlertMessage>)}
    </div> */}
      </Card.Group>
      
    </div>
  );
}
