import "../css/dashboard.css";
import { logoutClick, refreshTokenClick } from "../utils/spotifyUtil";

const refreshToken = () => {};

function RefreshToken() {
  return (
    <>
      <section className="hero is-fullheight">
        <div className="hero-body is-flex-direction-column is-justify-content-center">
          <h1 className="m-3 title big-header">oops...</h1>
          <h2 className="m-3 subtitle">Your session has expired!</h2>
          <div className="section"></div>
          <button
            className="button is-success m-3 is-inverted is-medium"
            id="login-button"
            onClick={refreshRedirect}
          >
            Refresh Session
          </button>
          <button
            className="button is-success m-3 is-inverted is-medium"
            id="login-button"
            onClick={logoutClick}
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
}

const refreshRedirect = () => {
  refreshToken();
  window.location = "./dashboard";
};

export default RefreshToken;
