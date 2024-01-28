import "../css/dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylist, getTrack, profileInit } from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import { IoArrowBackOutline } from "react-icons/io5";
import HorizontalTile from "../components/horizontal-tile";

function FoundIn() {
  const trackId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const navigate = useNavigate();

  const track = getTrack(trackId);
  let foundIn = track.foundIn.map((playlist) => getPlaylist(playlist));

  const tiles = (
    <>
      {foundIn.map((playlist) => (
        <HorizontalTile
          key={playlist.id}
          linkId={`../tracklist/${playlist.id}`}
          img={playlist.images[0].url}
          name={playlist.name}
        ></HorizontalTile>
      ))}
    </>
  );

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <div className="section"></div>
          <button className="button is-text mb-5" onClick={history.back}>
            <IoArrowBackOutline className="arrow" />
          </button>
          <h1 className="m-3 title">{track.track.name}</h1>
          <h2 className="subtitle m-3">{track.track.artists[0].name}</h2>
          <div className="section"></div>
          <div className="columns is-8">
            <div className="column">
              <div className="">{tiles}</div>
            </div>
          </div>
          <div className="section"></div>
        </div>
      </section>
    </>
  );
}

export default FoundIn;
