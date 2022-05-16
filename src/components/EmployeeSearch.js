import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import { PlayFill } from "react-bootstrap-icons";
import VoiceReset from "../services/voicereset.service";

export default function EmployeeSearch() {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
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

  return (
    <div className="container mt-4">
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchData(e.target.value)}
      />
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
        {searchTerm.length > 1
          ? filteredResults.map((item) => {
              return (
                <div className="c-card">
                  <p>{item.name}</p>
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
              );
            })
          : APIData.map((item) => {
              return (
                <div className="c-card">
                  <p>{item.name}</p>
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
              );
            })}
      </Card.Group>
    </div>
  );
}
