import { Link } from "react-router-dom";
import "../css/track-tile.css";
import PropTypes from "prop-types";

function TrackTile(props) {
  // Defines side track tile is on
  let flexDir = "card-body is-flex is-align-content-center is-flex-direction-row"
  if (props.reversed) {
    flexDir = "card-body is-flex is-align-content-center is-flex-direction-row-reverse"
  }
  let textAlign = "content p-1"
  if (props.reversed) {
    textAlign = "content p-1 has-text-right"
  }

  return (
    <>
      <Link
        to={`/track-view/${props.track.id}`}
        className="track-tile card"
      >
        <div className={flexDir}>
          <div className="p-1">
            {props.track.album.images[2] ? (
              <img
                className="image is-64x64 card-media"
                src={props.track.album.images[2].url}
              ></img>
            ) : (
              <img
                className="image is-64x64 card-media"
                src="https://placekitten.com/64/64"
              ></img>
            )}
          </div>
          <div className={textAlign}>
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
