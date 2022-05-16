import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("****Calling use effect ****");
  }, []);

  return (
    <div class="jumbotron text-center" style={{background:"#ffffff", marginTop:"50px", alignContent:""}}>
      <div class="container">
        <h1 class="display-4">Cheetah</h1>
        <p class="lead"> Welcome to Cheetah's name pronunciation</p>
      </div>
    </div>
  );
};

export default Home;
