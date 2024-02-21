import { Link } from "react-router-dom";
import "../css/dashboard.css";
import PropTypes from "prop-types";

function PlaylistTile(props) {
  return (
    <>
      <figure className="m-4">
        <Link
          className="has-text-dark playlist-container"
          to={`../tracklist/${props.playlistId}`}
        >
          <img
            className="playlist-image is-256x256 p-1"
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
