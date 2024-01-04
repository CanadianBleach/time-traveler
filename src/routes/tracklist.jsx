import PropTypes from "prop-types";
import React from "react";
import { fetchTracks } from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import SongTile from "../components/track-tile";
import { useEffect, useState } from "react";

const Tracklist = () => {
  const playlistId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const [loading, setLoading] = useState(false);
  const [trackData, setTrackData] = useState([playlistId]);

  useEffect(() => {
    const loadTracks = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      setLoading(true);

      // Await make wait until that
      // This comes back with the correct response btw
      return await fetchTracks(playlistId);
    };

    // Call the function
    loadTracks().then(
      (tracks) => {
        console.log(tracks);
        setTrackData(tracks);
        setLoading(false);
      },
      [playlistId]
    );
  });

  console.log(trackData);

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar href="" src=""></NavBar>
        <div className="container">
          <div className="section"></div>
          <h2 className="m-3 subtitle">Bob</h2>
          <div className="is-flex-direction-column is-justify-content-center">
            <div className="is-align-content-flex-start is-flex is-flex-wrap-wrap">
              {loading ? <h4>Loading...</h4> : <h4>Loaded</h4>}
            </div>
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
