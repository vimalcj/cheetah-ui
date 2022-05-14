import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  console.log(username);
  console.log(password);
  return axios
    .post(API_URL + "auth/login", {
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
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
