import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loggedIn } from "../utils/spotifyUtil";
import PlaylistTile from "../components/playlist-tile";

function Dashboard() {
  // Redirect to main
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn()) {
      navigate("../");
    }
  }, [navigate]);

  const userPlaylists = JSON.parse(localStorage.getItem("user_playlists"));
  const playlists = userPlaylists.items;

  console.log(playlists);

  const playlistTiles = (
    <>
      {playlists.map((track) => (
        <PlaylistTile
          key={track.id}
          playlistId={track.id}
          img={track.images[0].url}
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
          <h2 className="m-3 subtitle">Playlists</h2>
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
