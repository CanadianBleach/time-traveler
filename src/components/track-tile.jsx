import { Link } from "react-router-dom";
import "../css/dashboard.css";
import PropTypes from "prop-types";
function TrackTile(props) {
  console.log(props.track.album.images[2]);
  return (
    <>
      <div className="columns m-1">
        <div className="column is-one-fifth">
          {props.track.album.images[2] ? (
            <img src={props.track.album.images[2].url}></img>
          ) : (
            <img src="http://via.placeholder.com/64x64"></img>
          )}
        </div>
        <div className="column">
          <div className="title is-size-5">{props.track.name}</div>
          <div className="subtitle is-size-5">
            {props.track.artists[0].name}
          </div>
        </div>
      </div>
    </>
  );
}

TrackTile.propTypes = {
  track: PropTypes.object,
};

export default TrackTile;
