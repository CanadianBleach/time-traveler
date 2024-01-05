import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loggedIn, loginWithSpotifyClick } from "../utils/spotifyUtil";

function Root() {
  // Redirect to dashboard
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="hero-body is-flex-direction-column is-justify-content-center">
          <h1 className="m-3 title">So you got time traveler...</h1>
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
