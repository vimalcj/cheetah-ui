import axios from "axios";

const API_URL = "http://localhost:8080/";

const search = (username, password) => {
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

const SearchService = {
  search,
};

export default SearchService;
