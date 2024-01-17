import "../css/dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPlaylists, getProfile, loggedIn } from "../utils/spotifyUtil";
import PlaylistTile from "../components/playlist-tile";
import TrackTile from "../components/track-tile";

function Dashboard() {
  // Redirect to main
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn()) {
      navigate("../");
    }
  }, [navigate]);

  const playlistData = getPlaylists();
  const playlists = playlistData.items;
  const userData = getProfile();

  console.log("Playlists", playlists);

  if (!playlists) {
    return (
      <>
        <section className="hero is-fullheight">
          <NavBar></NavBar>
          <div className="container">
            <div className="notification">
              <div className="section"></div>
              <h2 className="has-text-centered	m-3 subtitle">NO PLAYLISTS</h2>
              <button
                className="has-text-centered button is-outline is-info"
                onClick={getPlaylists}
              >
                HELP
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }
  const playlistTiles = (
    <>
      {playlists.map((playlist) => (
        <PlaylistTile
          key={playlist.id}
          playlistId={playlist.id}
          img={playlist.images[0].url}
          playlistName={playlist.name}
        ></PlaylistTile>
      ))}
    </>
  );

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <div className="section"></div>
          <h2 className="m-3 subtitle">Playlists - {userData.display_name}</h2>
          <div className="is-flex-direction-column is-justify-content-center">
            <div className="is-align-content-flex-start is-flex is-flex-wrap-wrap">
              {playlists ? (
                playlistTiles
              ) : (
                <>
                  <div>HELP</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
