import { Link } from "react-router-dom";
import "../css/dashboard.css"
import PropTypes from "prop-types";

function TrackTile(props) {
  return (
    <>
      <figure className="card m-2">
        <Link target="#blank" to={props.href}>
        <div>{props.name}</div>
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

TrackTile.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
  href: PropTypes.string,
};

export default TrackTile;
