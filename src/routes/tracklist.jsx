import PropTypes from "prop-types";
import React from "react";
import {
  fetchTracks,
  getPlaylists,
  getPlaylist,
  getProfile,
  loggedIn,
} from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import SongTile from "../components/track-tile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackTile from "../components/track-tile";

const Tracklist = (props) => {
  const playlistId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const userData = getProfile();
  const playlist = getPlaylist(playlistId);

  const [tracks, setTracks] = useState([playlistId]);
  const [tracksLoaded, setTracksLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      setTracksLoaded(false);
      const data = await fetchTracks(playlistId);
      if (data) {
        setTracks(data);
        setTracksLoaded(true);
      }
    })();
  }, [playlistId]);

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <div className="section"></div>
          <div className="">
            <h1 className="title">{playlist.name}</h1>
            <h2 className="subtitle">{playlist.description}</h2>
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
            <div className="section"></div>
          </div>
        </div>
      </section>
    </>
  );
};

Tracklist.propTypes = {
  shown: PropTypes.string,
};

export default Tracklist;
