import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Input } from "semantic-ui-react";
export default function EmployeeSearch() {
  const [APIData, setAPIData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    axios
      .get("https://namepronounciation-tool.azurewebsites.net/cheetah/getAllEmployees")
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

  return (
    <div style={{ padding: 50 }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchData(e.target.value)}
      />
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}>
        {searchTerm.length > 1
          ? filteredResults.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Description>
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
                        onClick={() => start(item.recordUrl)}
                      >
                        Play
                      </button>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })
          : APIData.map((item) => {
              return (
                <Card>
                  <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Description>
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
                        onClick={() => start(item.recordUrl)}
                      >
                        Play
                      </button>
                    </Card.Description>
                  </Card.Content>
                </Card>
              );
            })}
      </Card.Group>
    </div>
  );
}
