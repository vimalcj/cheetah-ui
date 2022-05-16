import axios from "axios";
import { baseUrl } from "../util";


const voiceReset = (userName) => {
  console.log(userName);
  return axios
  .post(baseUrl + "cheetah/standard/record?userName="+userName)
  .then((response) => {
    console.log(response);
    return response.data;
  });
}
const VoiceReset = {
  voiceReset
};

export default VoiceReset;
