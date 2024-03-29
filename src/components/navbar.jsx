import { getProfile, loggedIn } from "../utils/spotifyUtil";
import { loginWithSpotifyClick } from "../utils/spotifyUtil";
import { logoutClick } from "../utils/spotifyUtil";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../css/global-styles.css";

function NavBar() {
  let navStart;
  let navEnd;
  const userData = getProfile();
  console.log(userData);

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
        <Link target="#blank" to="" className="navbar-item">
          <div className="navbar-item">{userData.display_name}</div>

          {userData.images[0] ? (
            <img src={userData.images[0].url} id="profile-img"></img>
          ) : (
            <img
              className="card-media"
              src="https://placekitten.com/64/64"
              id="profile-img"
            ></img>
          )}
        </Link>
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

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">{navStart}</div>
          <div className="navbar-end">{navEnd}</div>
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
