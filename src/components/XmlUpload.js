import axios from "axios";
import React, { useState, useRef } from "react";

const XmlUpload = () => {

    const [file, setFile] = useState()

    function handleChange(event) {
      setFile(event.target.files[0])
    }
    
    function handleSubmit(event) {
      event.preventDefault()
      const url = 'https://namepronounciation-tool.azurewebsites.net/cheetah/admin/upload';
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });
  
    }
  
    return (
      <div className="App">
          <form onSubmit={handleSubmit}>
            <h1>File Upload</h1>
            <input type="file" onChange={handleChange}/>
            <button type="submit">Upload</button>
          </form>
      </div>
    );
  }
  
export default XmlUpload;
