import "../css/dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../components/navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getPlaylists,
  getProfile,
  loggedIn,
  profileInit,
  refreshTokenClick,
  tokenExpired,
} from "../utils/spotifyUtil";
import PlaylistTile from "../components/playlist-tile";

function Dashboard() {
  const playlistData = getPlaylists();
  const profileData = getProfile();

  const playlistTiles = (
    <>
      {playlistData.items.map((playlist) => (
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
          <h2 className="m-3 subtitle">
            Playlists - {profileData.display_name}
          </h2>
          <div className="is-flex-direction-column is-justify-content-center">
            <div className="is-align-content-flex-start is-flex is-flex-wrap-wrap">
              {playlistTiles}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
