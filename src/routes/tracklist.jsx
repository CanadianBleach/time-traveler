import PropTypes from "prop-types";
import React from "react";
import {
  fetchTracks,
  getPlaylists,
  getPlaylist,
  getProfile,
  loggedIn,
  getTracks,
  getDuplicatesFromId,
} from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import SongTile from "../components/track-tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackTile from "../components/track-tile";

const Tracklist = () => {
  const playlistId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  //const userData = getProfile();
  const playlist = getPlaylist(playlistId);

  const [tracks, setTracks] = useState([playlistId]);
  const [tracksLoaded, setTracksLoaded] = useState(false);

  const [dupes, setDupes] = useState([playlistId]);
  const [dupesLoaded, setDupesLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setTracksLoaded(false);
      setDupesLoaded(false);
      const dupesData = getDuplicatesFromId(playlistId);
      setDupes(dupesData);
      setDupesLoaded(true);
      const data = await fetchTracks(playlistId);
      if (data) {
        setTracks(data);
        setTracksLoaded(true);
        console.log("tracks", data);
      }
      if (dupesData) {
        console.log("dupes", dupesData);
      }
    })();
  }, [playlistId]);

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <div className="section"></div>
          <div className="columns is-8">
            <div className="column">
              <h1 className="title ml-3">{playlist.name}</h1>
              <h2 className="subtitle ml-3">{playlist.description}</h2>
              <div className="">
                {tracksLoaded ? (
                  tracks.items.map((track) => (
                    <TrackTile
                      className="m-2"
                      key={track.track.id}
                      track={track.track}
                    ></TrackTile>
                  ))
                ) : (
                  <div>Loading tracks...</div>
                )}
              </div>
            </div>
            <div className="column">
              <h2 className="title has-text-right mr-3">
                Here are some dupe listens we found..
              </h2>
              <div className="">
                {dupesLoaded ? (
                  dupes.map((track) => (
                    <TrackTile
                      className="m-2"
                      key={track.id}
                      track={track.track}
                    ></TrackTile>
                  ))
                ) : (
                  <div>Loading tracks...</div>
                )}
              </div>
            </div>
          </div>
          <div className="section"></div>
        </div>
      </section>
    </>
  );
};

Tracklist.propTypes = {
  shown: PropTypes.string,
};

export default Tracklist;
