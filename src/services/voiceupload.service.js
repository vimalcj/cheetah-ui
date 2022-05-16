import axios from "axios";
import { baseUrl } from "../util";



const voiceUpload = function uploadFile(file, username) {
      const url = baseUrl+'cheetah/record?userName='+username;
      const formData = new FormData();
      formData.append('file', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      return axios.post(url, formData, config) .then((response) => {
        console.log(response);
        console.log(response.data);
        return response.data;
      });
};

const VoiceUploadService = {
  voiceUpload,
};
export default VoiceUploadService;
