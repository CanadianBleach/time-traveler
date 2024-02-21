import "../css/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { getPlaylist, getTrack } from "../utils/spotifyUtil";
import NavBar from "../components/navbar";
import { IoArrowBackOutline } from "react-icons/io5";
import HorizontalTile from "../components/horizontal-tile";
import Tracklist from "./tracklist";

function FoundIn() {
  const trackId = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );

  const track = getTrack(trackId);
  let foundIn = track.foundIn.map((playlist) => getPlaylist(playlist));

  console.log("viewing track", track);

  const goBack = () => {
    history.back();
  };

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
          <button className="button is-text mb-5" onClick={goBack}>
            <IoArrowBackOutline className="arrow" />
          </button>
          <Link
            target="_blank"
            to={track.track.external_urls.spotify}
            className="columns"
          >
            <img
              src={track.track.album.images[1].url}
              className="image is-128x128"
            ></img>
            <div>
              <h1 className="m-3 title">{track.track.name}</h1>
              <h2 className="subtitle m-3">{track.track.artists[0].name}</h2>
            </div>
          </Link>
          <div className="section"></div>
          <h2 className="subtitle is-size-3">This soung is found in...</h2>
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
