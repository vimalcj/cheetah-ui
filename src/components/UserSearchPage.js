import React, { useState, useRef } from "react";

const UserSearchPage = () => {
    const [content, setContent] = useState("");
  
   
  
    return (
      <div className="container-fluid" style={{width:"100%"}}>
       <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">My Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
  </ul>
      </div>
    );
  };
  
  export default UserSearchPage;