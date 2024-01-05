import { Link } from "react-router-dom";
import "../css/dashboard.css"
import PropTypes from "prop-types";

function PlaylistTile(props) {
  return (
    <>
      <figure className="card m-2">
        <Link to={`./tracklist/${props.playlistId}`}>
          <img
            className="image is-128x128 card-body p-1"
            src={props.img}
            alt="playlist-cover"
          ></img>
        </Link>
      </figure>
    </>
  );
}

PlaylistTile.propTypes = {
  img: PropTypes.string,
  playlistId: PropTypes.string,
};

export default PlaylistTile;
