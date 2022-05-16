import AuthService from "../services/auth.service";
import RecordView from "./RecordView";
import {MicFill } from 'react-bootstrap-icons';

const BoardUser = () => {
  const user = AuthService.getCurrentUser();
  const start = (media) => {
    media = media + "&xyz=" + new Date();
    console.log(media);
    let audio = new Audio(media);
    audio.play();
  };
 
  return (


<div className="record-section d-flex flex-column p-3">

  
  <img src={user.imageUrl} className="card-img-top m-1 p-1 " alt="profile picture" style={{ width : "150px", height:"150px", background: "lightred"}}/>
    <h5 className="card-title">{user.name.toUpperCase()}</h5>
    <div className="current-voice">
    <a href="#" onClick={ start(user.recordUrl)}> 
    <MicFill />
    </a>
    </div>
    <p>My active voice</p>
    <RecordView/>
</div>
     
  );
};

export default BoardUser;
