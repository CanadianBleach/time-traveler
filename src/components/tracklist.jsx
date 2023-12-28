import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";

const Tracklist = () => {
  const { playlist_id } = useParams();

  return (
    <div>
      <h2>Playlist ID: {playlist_id}</h2>
    </div>
  );
};

Tracklist.propTypes = {
  shown: PropTypes.string,
};

export default Tracklist;
