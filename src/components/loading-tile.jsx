import { Link } from "react-router-dom";
import "../css/track-tile.css";
import PropTypes from "prop-types";

function LoadingTile(props) {
  // Defines side track tile is on
  let flexDir =
    "card-body is-flex is-align-content-center is-flex-direction-row";
  if (props.reversed) {
    flexDir =
      "card-body is-flex is-align-content-center is-flex-direction-row-reverse";
  }
  let textAlign = "content p-1";
  if (props.reversed) {
    textAlign = "content p-1 has-text-right";
  }

  return (
    <>
      <Link className="track-tile card">
        <div className={flexDir}>
          <div className="p-1">
            <img
              className="image is-64x64 card-media"
              src="https://placekitten.com/64/64"
            ></img>
          </div>
          <div className={textAlign}>
            <div className="title is-size-5">Name</div>
            <div className="subtitle is-size-5">Artist</div>
          </div>
        </div>
      </Link>
    </>
  );
}

LoadingTile.propTypes = {
  reversed: PropTypes.bool,
};

export default LoadingTile;
