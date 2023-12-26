import {
  fetchPlaylists,
  loggedIn,
  refreshTokenClick,
} from "../utils/spotifyUtil";
import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";
import PlaylistTile from "../components/playlist-tile";
import Playlist from "./playlist";

let data = await fetchPlaylists();

function Dashboard() {
  let playlists = data.items;
  let dashboard = <></>;

  if (playlists) {
    dashboard = (
      <>
        {playlists.map(function (playlist) {
          return (
            <>
              <PlaylistTile src={playlist.images[0].url} playlistId={playlist.id} ></PlaylistTile>
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
          <button className="button is-button-primary" onClick={refreshTokenClick}>
            Refresh Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <h2 className="m-3 subtitle">Playlists</h2>
{/*           <Playlist></Playlist>
 */}          <div className="is-flex-direction-column is-justify-content-center">
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
