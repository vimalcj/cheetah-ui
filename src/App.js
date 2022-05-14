import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Nav, Navbar } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Search from "./components/Search";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";

const App = () => {
  // const [showUserBoard, setShowUserBoard] = useState(false);
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
    // setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div style={{ backgroundColor: "#ffffff", padding: ".5rem" }}>
      <div>
        <Navbar
          collapseOnSelect
          expand="md"
          bg="#ff1a1a"
          variant="light"
          className="px-4 py-8"
          fixed="top"
          style={{ backgroundColor: "#ff1a1a", padding: ".5rem" }}
        >
          <Link to={"/"} className="navbar-brand" style={{color:"white"}}>
            Cheetah
          </Link>

          {showAdminBoard && (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link" style={{color:"white"}}>
                  Home
                </Link>
              </li>
            </div>
          )}

          {currentUser && !showAdminBoard ? (
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/user"} className="nav-link" style={{color:"white"}}>
                  Home
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link"></Link>
              </li>
            </div>
          )}

          <Nav className="ml-auto align-items-end px-3">
           
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                 <Search />
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut} style={{color:"white"}}>
                    Logout
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link" style={{color:"white"}}>
                    Login
                  </Link>
                </li>
              </div>
            )}
          </Nav>
        </Navbar>
      </div>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          {/* <Route exact path={"/home"} element={<Home />} /> */}
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          {/* <Route path="/mod" element={<BoardModerator />} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
