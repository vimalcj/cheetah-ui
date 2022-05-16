import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileMedicalFill, MicFill } from 'react-bootstrap-icons';

const XmlUpload = () => {

    const [file, setFile] = useState()
    const navigate = useNavigate();
    function handleChange(event) {
      setFile(event.target.files[0])
    }

    // function showAlert(){
    //   const alert = alert.show('Employee data uploaded successfully', {
    //     timeout: 2000, // custom timeout just for this one alert
    //     type: 'success',
    //     onOpen: () => {
    //       console.log('hey')
    //     }, // callback that will be executed after this alert open
    //     onClose: () => {
    //       console.log('closed')
    //     } // callback that will be executed after this alert is removed
    //   })
    // }
    
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
        navigate("/admin");
        window.location.reload();
      });
  
    }
  
    return (
      <div className="xml-upload p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="p-2">Employees Onboard</h2>
            <input type="file" onChange={handleChange}/>
            <button className="btn btn-primary" type="submit">Upload <FileMedicalFill/></button>
          </form>
      </div>
    );
  }
  
export default XmlUpload;
