import { loggedIn } from "../utils/spotifyUtil";
import { loginWithSpotifyClick } from "../utils/spotifyUtil";
import { logoutClick } from "../utils/spotifyUtil";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/global-styles.css";

let navStart;
let navEnd;

if (loggedIn()) {
  navStart = (
    <>
      <div className="navbar-brand">
        <Link className="navbar-item">Time-Traveler</Link>
      </div>
      <Link
        target="#blank"
        className="navbar-item"
        to="https://github.com/CanadianBleach/time-traveler"
      >
        Github
      </Link>
      <Link to={`/dashboard`} className="navbar-item">
        Dashboard
      </Link>
    </>
  );
  // TODO: Are you sure pop up modal
  navEnd = (
    <>
      <Link className="navbar-item" to="./" onClick={logoutClick}>
        Log Out
      </Link>
    </>
  );
} else {
  navStart = (
    <>
      <div className="navbar-brand">
        <Link to={`/`} className="navbar-item">
          Time-Traveler
        </Link>
      </div>
      <Link
        target="#blank"
        className="navbar-item"
        to="https://github.com/CanadianBleach/time-traveler"
      >
        Github
      </Link>
    </>
  );
  navEnd = (
    <>
      <Link className="navbar-item" onClick={loginWithSpotifyClick}>
        Log In
      </Link>
    </>
  );
}

function NavBar(props) {
  return (
    <>
      <nav className="navbar mw-70" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">{navStart}</div>
          <div className="navbar-end">
            {navEnd}
            <Link target="#blank" to={props.href} className="navbar-item">
              <img src={props.src} id="profile-img"></img>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

NavBar.propTypes = {
  src: PropTypes.string,
  href: PropTypes.string,
};

export default NavBar;
