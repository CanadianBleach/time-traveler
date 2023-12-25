import { isLoggedIn } from "../utils/spotifyUtil";
import { loginWithSpotifyClick } from "../utils/spotifyUtil";
import { logoutClick } from "../utils/spotifyUtil";
import { Outlet, Link } from "react-router-dom";
import "../css/global-styles.css";

let navStart;
let navEnd;

if (isLoggedIn()) {
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
      <Link className="navbar-item" to={`/`} onClick={logoutClick}>
        Log Out
      </Link>
    </>
  );
} else {
  navStart = (
    <>
      <div className="navbar-brand">
        <Link to={`/`} className="navbar-item">Time-Traveler</Link>
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
      <>
        <Link className="navbar-item" onClick={loginWithSpotifyClick}>
          Log In
        </Link>
      </>
    </>
  );
}

function NavBar() {
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

export default NavBar;
