import AuthService from "../services/auth.service";
import RecordView from "./RecordView";
import { MicFill } from "react-bootstrap-icons";
import { Input } from "semantic-ui-react";
import UserSearch from "./UserSearch";
import { useNavigate } from "react-router-dom";

const BoardUser = () => {
  // const [pageState, setPageState] = useState(false);
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  function start() {
    let media = user.recordUrl;
    let media_url = media + "&xyz=" + new Date();
    console.log(media_url);
    let audio = new Audio(media);
    audio.play();
  }

  const onHandleClick = () => {
    navigate("/userSearch");
  };

  return (
    <div className="container">
      <div className="p-2 bd-highlight">
        <div className="container " align="right">
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            type="submit"
            onClick={onHandleClick}
          >
            Search Other Voice
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="record-section d-flex flex-column p-3">
          <img
            src={user.imageUrl}
            className="card-img-top m-1 p-1 "
            alt="profile picture"
            style={{ width: "150px", height: "150px", background: "lightred" }}
          />
          <h5 className="card-title">{user.name.toUpperCase()}</h5>
          <div className="current-voice">
            <a href="#" onClick={start}>
              <MicFill />
            </a>
          </div>
          <p>
            <b>My voice</b>
          </p>
          <RecordView />
        </div>
      </div>
    </div>
  );
};

export default BoardUser;
