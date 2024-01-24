import { Link } from "react-router-dom";
import "../css/track-tile.css";
import PropTypes from "prop-types";

function TrackTile(props) {
  let flexDir = "card-body is-flex is-align-content-center is-flex-direction-row"
  if (props.reversed) {
    flexDir = "card-body is-flex is-align-content-center is-flex-direction-row-reverse"
  }
  return (
    <>
      <Link
        target="#blank"
        to={props.track.external_urls.spotify}
        className="track-tile card"
      >
        <div className={flexDir}>
          <div className="p-1">
            {props.track.album.images[2] ? (
              <img
                className="card-media"
                src={props.track.album.images[2].url}
              ></img>
            ) : (
              <img
                className="card-media"
                src="https://placekitten.com/64/64"
              ></img>
            )}
          </div>
          <div className="content p-1">
            <div className="title is-size-5">{props.track.name}</div>
            <div className="subtitle is-size-5">
              {props.track.artists[0].name}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

TrackTile.propTypes = {
  track: PropTypes.object,
  reversed: PropTypes.bool,
};

export default TrackTile;
