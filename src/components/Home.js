import React, { useEffect } from "react";


const Home = () => {

  useEffect(() => {
    console.log("****Calling use effect ****")
   
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
      </header>
    </div>
  );
};

export default Home;
