import React from "react";
import AuthService from "../services/auth.service";
import EmployeeSearch from "./EmployeeSearch";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <EmployeeSearch/>
  );
};

export default Profile;
