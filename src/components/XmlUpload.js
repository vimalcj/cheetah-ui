import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileMedicalFill, MicFill } from 'react-bootstrap-icons';
import AlertMessage from "./AlertMessage";
import { baseUrl } from "../util";


const XmlUpload = () => {
  const [isAlertShow, setIsAlertShow] = useState(false);
    const [file, setFile] = useState()
    const navigate = useNavigate();
    function handleChange(event) {
      setFile(event.target.files[0])
    }
    const onAlertMessageClose = ()=>{
      setIsAlertShow(false)
    }

    function handleSubmit(event) {
      event.preventDefault()
      const url = baseUrl+'cheetah/admin/upload';
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
       setIsAlertShow(true);
      });
  
    }
  
    return (
      <div className="xml-upload p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="p-2">Employees Onboard</h2>
            <input type="file" onChange={handleChange}/>
            <button className="btn btn-primary" type="submit">Upload <FileMedicalFill/></button>
          </form>
          <div className="container"   style={{ marginTop: "50px", paddingBottom: "10px"}}>
        {isAlertShow && (<AlertMessage message = "Employees onboarded successfully" handleClose = {() => onAlertMessageClose()}></AlertMessage>)}
      </div>
      </div>
    );
  }
  
export default XmlUpload;
