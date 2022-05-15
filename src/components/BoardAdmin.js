import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import EmployeeSearch from "./EmployeeSearch";
import XmlUpload from "./XmlUpload";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container-fluid" style={{ padding: "50px" }}>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">
            My Profile
          </a>
          <div style={{ width: "100%" }}>
            <EmployeeSearch style={{ width: "100%" }} />
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            XML Upload
          </a>
          <div style={{ width: "100%" }}>
            <XmlUpload style={{ width: "100%" }} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BoardAdmin;
