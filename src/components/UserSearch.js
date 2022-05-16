import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
import { PlayFill, RecordBtn } from "react-bootstrap-icons";
import { baseUrl } from "../util";

export default function UserSearch() {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  useEffect(() => {
    // axios
    //   .get(
    //     "https://namepronounciation-tool.azurewebsites.net/cheetah/getAllEmployees"
    //   )
    //   .then((response) => {
    //     setAPIData(response.data);
    //   });
  }, []);

  const start = (media) => {
    media = media + "&xyz=" + new Date();
    console.log(media);
    let audio = new Audio(media);
    audio.play();
  };

  const startSearchingData = () =>{
    console.log(searchTerm)
    axios
    .get(
      baseUrl+"cheetah/genericSearch/employee/"+searchTerm
    )
    .then((response) => {
      setAPIData(response.data);
      setFilteredResults(response.data)
    }); 
  }


  const searchData = (value) => {
    setSearchTerm(value);
  };


  return (
    <div className="container mt-4">
      <Input
        style={{ paddingTop: "10px", paddingBottom: "10px"}}
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchData(e.target.value)}
      />
       <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={startSearchingData} >
              Search
            </button>
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
                     
                    </div>
                  </div>
                </div>
              );
            })}
      </Card.Group>
    </div>
  );
}
