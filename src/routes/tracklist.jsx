import PropTypes from "prop-types";
import React from "react";
import {
  fetchTracks,
  getPlaylist,
  getDuplicatesFromId,
  tokenExpired,
  refreshTokenClick,
} from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import TrackTile from "../components/track-tile";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../css/tracklist.css";

const Tracklist = () => {
  const navigate = useNavigate();

  const playlistId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const playlist = getPlaylist(playlistId);

  const [tracks, setTracks] = useState([playlistId]);
  const [tracksLoaded, setTracksLoaded] = useState(false);

  const [dupes, setDupes] = useState([playlistId]);
  const [dupesLoaded, setDupesLoaded] = useState(false);

  useEffect(() => {
    if (tokenExpired()) {
      console.log(tokenExpired());
      refreshTokenClick();
      return;
    }

    (async () => {
      setTracksLoaded(false);
      setDupesLoaded(false);

      const dupesData = getDuplicatesFromId(playlistId);
      const trackData = await fetchTracks(playlistId);

      if (trackData) {
        setTracks(trackData);
        setTracksLoaded(true);
        console.log("tracks", trackData);
        //TODO save data so it doesnt refresh every time
      }

      if (dupesData) {
        setDupes(dupesData);
        setDupesLoaded(true);
        console.log("dupes", dupesData);
      }
    })();
  }, [playlistId]);

  const goBack = () => {
    navigate("../");
  };

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container">
          <div className="section"></div>
          <div className="is-flex is-flex-direction-row is-justify-content-space-between">
            <button className="button is-text mb-5" onClick={goBack}>
              <IoArrowBackOutline className="arrow" />
            </button>
            {!dupesLoaded ? <div className="subtitle">Loading...</div> : <></>}
          </div>
          <div className="columns mb-5">
            <div className="column">
              <h1 className="title">{playlist.name}</h1>
              <h2 className="subtitle">{playlist.description}</h2>
            </div>
            <h2 className="column title has-text-right">
              Here are some dupe listens we found..
            </h2>
          </div>
          <div className="columns is-8">
            <div className="column">
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
                  <></>
                )}
              </div>
            </div>
            <div className="column">
              <div className="">
                {dupesLoaded ? (
                  dupes.map((track) => (
                    <TrackTile
                      className="m-2"
                      key={track.id}
                      track={track.track}
                      reversed={true}
                    ></TrackTile>
                  ))
                ) : (
                  <></>
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
