import {
  fetchPlaylists,
  fetchProfile,
  loggedIn,
  loginWithSpotifyClick,
  refreshTokenClick,
} from "../utils/spotifyUtil";
import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import PlaylistTile from "../components/playlist-tile";

// Fetch and store playlists to database
const data = await fetchPlaylists();
const userData = await fetchProfile();

function Dashboard() {
  let dashboard = <></>;

  if (data.error) {
    return (
      <>
        <section className="hero is-fullheight">
          <NavBar></NavBar>
          <div className="container">
            <div className="section"></div>
            <div className="is-flex-direction-column is-justify-content-center">
              <h2 className="subtitle">
                You may need to <a onClick={loginWithSpotifyClick}>log in...</a>
              </h2>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Creation of tiles
  let playlists = data.items;
  if (playlists) {
    dashboard = (
      <>
        {playlists.map(function (playlist) {
          return (
            <>
              <PlaylistTile
                src={playlist.images[0].url}
                playlistId={playlist.id}
              ></PlaylistTile>
            </>
          );
        })}
      </>
    );
  } else {
    console.warn("NO PLAYLISTS LOADED");
    dashboard = (
      <>
        <div className="container">
          <h3>No playlists to show... get on that girl.</h3>
          <button
            className="button is-button-primary"
            onClick={refreshTokenClick}
          >
            Refresh Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar
          href={userData.external_urls.spotify}
          src={userData.images[0].url}
        ></NavBar>
        <div className="container">
          <div className="section"></div>
          <h2 className="m-3 subtitle">Playlists - {userData.display_name}</h2>
          <div className="is-flex-direction-column is-justify-content-center">
            <div className="is-align-content-flex-start is-flex is-flex-wrap-wrap">
              {dashboard}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
