import React, { useState, useEffect } from "react";

const BoardModerator = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
   
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardModerator;
