import { Link } from "react-router-dom";
import "../css/dashboard.css";
import PropTypes from "prop-types";

function PlaylistTile(props) {
  return (
    <>
      <figure className="m-2">
        <Link
          className="has-text-dark playlist-container"
          to={`../tracklist/${props.playlistId}`}
        >
          <div className="playlist-name subtitle has-text-centered">
            {props.playlistName}
          </div>
          <img
            className="playlist-image is-128x128 p-1"
            src={props.img}
            alt="playlist-cover"
          ></img>
        </Link>
      </figure>
    </>
  );
}

PlaylistTile.propTypes = {
  playlistName: PropTypes.string,
  img: PropTypes.string,
  playlistId: PropTypes.string,
};

export default PlaylistTile;
