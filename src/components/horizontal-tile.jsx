import { Link } from "react-router-dom"
import PropTypes from "prop-types";

function HorizontalTile(props) {
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
      <Link to={props.linkId} className="track-tile card">
        <div className={flexDir}>
          <div className="p-1">
            {props.img ? (
              <img className="image is-64x64 card-media" src={props.img}></img>
            ) : (
              <img
                className="image is-64x64 card-media"
                src="https://placekitten.com/64/64"
              ></img>
            )}
          </div>
          <div className={textAlign}>
            <div className="title is-size-5">{props.name}</div>
          </div>
        </div>
      </Link>
    </>
  );
}

HorizontalTile.propTypes = {
  linkId: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  reversed: PropTypes.bool,
};

export default HorizontalTile;
