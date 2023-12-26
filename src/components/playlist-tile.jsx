import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Playlist from "../routes/playlist";

function PlaylistTile(props) {
  return (
    <>
      <figure className="card m-2">
        <Link to={`./playlist/${props.playlistId}`}>
          <img
            className="image is-128x128 card-body p-1"
            src={props.src}
            alt="playlist-cover"
          ></img>
        </Link>
      </figure>
    </>
  );
}

PlaylistTile.propTypes = {
  src: PropTypes.string,
  playlistId: PropTypes.string,
};

export default PlaylistTile;
