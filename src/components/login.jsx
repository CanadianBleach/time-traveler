/* import { loginWithSpotifyClick } from "../utils/spotifyUtil";
 */
function Login() {
  return (
    <>
      <div className="m-6">
        <h2 className="title is-3 has-text-dark">
          So you got time traveler...
        </h2>
        <button
          className="button is-success is-inverted is-medium"
          id="login-button"
          onClick={loginWithSpotifyClick}
        >
          Log in with Spotify
        </button>
      </div>
    </>
  );
}

export default Login;
