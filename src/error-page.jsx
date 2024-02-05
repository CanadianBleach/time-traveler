import { useRouteError } from "react-router-dom";
import { refreshTokenClick } from "./utils/spotifyUtil";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  console.log("error-status", error);

  if (error.status == 401) refreshTokenClick();

  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-flex-direction-column is-justify-content-center">
        <h1>Oops!</h1>
        <p>
          Sorry, an unexpected error has occurred, or you session has expired.
        </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <div className="section"></div>
        <button
          className="button is-success m-3 is-inverted is-medium"
          id="login-button"
          onClick={refreshTokenClick}
        >
          Refresh Session
        </button>
        <button
          className="button is-success m-3 is-inverted is-medium"
          id="login-button"
          onClick={clearStorage}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

function clearStorage() {
  localStorage.clear();
  window.location = "../";
}
