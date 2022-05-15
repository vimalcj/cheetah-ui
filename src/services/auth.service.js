import axios from "axios";
import { baseUrl } from "../util";


const login = (username, password) => {
  console.log(username);
  console.log(password);
  return axios
    .post(baseUrl + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.data.name) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(baseUrl + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
