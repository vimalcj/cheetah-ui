import axios from "axios";

const API_URL = "http://localhost:8080/";

const search = (username) => {
  console.log(username);
  return axios
    .get(API_URL + "cheetah/search/1234567")
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    });
};

const SearchService = {
  search,
};

export default SearchService;
