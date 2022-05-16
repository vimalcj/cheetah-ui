import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Soundwave } from 'react-bootstrap-icons';
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import EventBus from "./common/EventBus";
import AdminSearchPage from "./components/AdminSearchPage";
import UserSearchPage from "./components/UserSearchPage";
import EmployeeSearch from "./components/EmployeeSearch";
import UserSearch from "./components/UserSearch";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      // setShowModeratorBoard(user.admin);
      setShowAdminBoard(user.admin);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div
        className="d-flex bd-highlight p-2"
        style={{ backgroundColor: "#ff1a1a" }}
      >
        <div className="p-2 flex-grow-1 bd-highlight">
          <ul className="list-inline ">
            {/* <li className="list-inline-item f-4">C H E E T A H</li> */}
            <li className="list-inline-item logo">
              <Link
                to={
                  showAdminBoard
                    ? "/admin"
                    : currentUser && !showAdminBoard
                    ? "/user"
                    : "/login"
                }
                className="nav-link"
              >
              <Soundwave size={30} />  C H E E T A H
              </Link>
            </li>
          </ul>
        </div>

        {/* <div className="p-2 bd-highlight">
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search Here!"
              aria-label="Search"
            />
            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div> */}
        <div className="p-2 bd-highlight">
        {currentUser ? (
          <a
            href="/login"
            className="nav-link"
            onClick={logOut}
            style={{ color: "white" }}
          >
           Logout
           
          </a>
        ):(
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to={"/login"}
                className="nav-link"
                style={{ color: "white" }}
              >
                Login
              </Link>
            </li>
          </div>
        )}
        </div>
      </div>
    
      <div className="flex">
        <Routes>
          <Route exact path={"/"} element={<Home />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />

          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/empSearch" element ={<UserSearch/>}/>
          <Route path="/adminSearch" element={<AdminSearchPage />} />
          <Route path="/search" element={<EmployeeSearch />} />
          <Route path="/userSearch" element={<UserSearch />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
