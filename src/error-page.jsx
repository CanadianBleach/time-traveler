import { useRouteError } from "react-router-dom";
import { refreshTokenClick } from "./utils/spotifyUtil";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>{" "}
      <button onClick={clearStorage}>Clear storage and reload.</button>
      <button onClick={refreshTokenClick}>Refresh Token</button>
    </div>
  );
}

function clearStorage() {
  localStorage.clear();
  window.location = "../";
}
