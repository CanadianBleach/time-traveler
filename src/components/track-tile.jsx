import { Link } from "react-router-dom";
import "../css/dashboard.css";
import PropTypes from "prop-types";

function TrackTile(props) {
  return (
    <>
      <Link
        target="#blank"
        to={props.track.external_urls.spotify}
        className="columns m-1"
      >
        <div className="column is-one-fifth">
          {props.track.album.images[2] ? (
            <img src={props.track.album.images[2].url}></img>
          ) : (
            <img src="https://placekitten.com/64/64"></img>
          )}
        </div>
        <div className="column">
          <div className="title is-size-5">{props.track.name}</div>
          <div className="subtitle is-size-5">
            {props.track.artists[0].name}
          </div>
        </div>
      </Link>
    </>
  );
}

TrackTile.propTypes = {
  track: PropTypes.object,
};

export default TrackTile;
