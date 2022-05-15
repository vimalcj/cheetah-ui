import AuthService from "../services/auth.service";
import RecordView from "./RecordView";


const BoardUser = () => {
  const user = AuthService.getCurrentUser();
  const start = (media) => {
    media = media + "&xyz=" + new Date();
    console.log(media);
    let audio = new Audio(media);
    audio.play();
  };
 
  return (


<div class="card" >
 
  <div class="card-body">
  <img src={user.imageUrl} class="card-img-top" alt="..." style={{ width : "150px", height:"150px"}}/>
    <h5 class="card-title">{user.name}</h5>
    <p class="card-text">My active recording</p>
    <a href="#" class="btn btn-primary" onClick={ start(user.recordUrl)}>My Voice</a>
    <RecordView/>
  
  </div>
</div>
     
  );
};

export default BoardUser;
