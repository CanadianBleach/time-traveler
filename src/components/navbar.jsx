import { isLoggedIn } from "../utils/spotifyUtil";
import { loginWithSpotifyClick } from "../utils/spotifyUtil";
import { fetchProfile } from "../utils/spotifyUtil";
import { logoutClick } from "../utils/spotifyUtil";
import "../css/styles.css";

let loginButton;
let userImage;

if (isLoggedIn()) {
  const userData = await fetchProfile();

  userImage = <img id="profile-img" className="m-3 has-text-center" src={userData.images[0].url}></img>;
  loginButton = (
    <a className="m-3 has-text-dark has-text-center" onClick={logoutClick}>
      Log out
    </a>
  );
} else {
  loginButton = (
    <a className="m-3 has-text-dark has-text-center" onClick={loginWithSpotifyClick}>
      Log in
    </a>
  );
}

function SiteNav() {
  return (
    <>
      <div className="is-flex">
        <div className="block m-1"></div>
        {loginButton}
        <a
          className="m-3 has-text-dark"
          href="https://github.com/CanadianBleach/"
          target="#blank"
        >
          Github
        </a>
        {userImage}
      </div>
    </>
  );
}

export default SiteNav;
