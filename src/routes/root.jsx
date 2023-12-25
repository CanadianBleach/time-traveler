import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { loggedIn } from "../utils/spotifyUtil";
import { loginWithSpotifyClick } from "../utils/spotifyUtil";

function Root() {
  // Redirect to dashboard
  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="hero-body is-flex-direction-column is-justify-content-center">
          <h2 className="m-3 subtitle">So you got time traveler...</h2>
          <button
            className="button is-success m-3 is-inverted is-medium"
            id="login-button"
            onClick={loginWithSpotifyClick}
          >
            Log in with Spotify
          </button>
        </div>
      </section>
    </>
  );
}

export default Root;
