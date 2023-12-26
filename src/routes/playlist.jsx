import NavBar from "../components/navbar";
import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

function Playlist(props) {
  const { playlistId } = useParams();
  
  useEffect(() => {
    // Perform data fetching based on productId
  }, [playlistId]);

  return (
    <>
      <section className="hero is-fullheight">
        <div className="container">
          <h2 className="ml-3 subtitle">Playlists {playlistId}</h2>
          <div className="is-flex-direction-column is-justify-content-center">
            Hello
          </div>
        </div>
      </section>
    </>
  );
}

export default Playlist;
