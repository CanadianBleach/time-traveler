import "../css/dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPlaylist, getTrack, profileInit } from "../utils/spotifyUtil";

function FoundIn() {
  const trackId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const track = getTrack(trackId);
  let foundIn = [];
  for (const t in track.foundIn) {
    foundIn.push(getPlaylist(track.foundIn[t]));
  }

  const tiles = foundIn.map((playlist) => {
    <div>{playlist.id}</div>
  });

  return (
    <>
      <div>{trackId}</div>
      <div>{tiles}</div>
    </>
  );
}

export default FoundIn;
