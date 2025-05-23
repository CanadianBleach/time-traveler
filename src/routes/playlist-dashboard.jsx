import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { getPlaylists, getProfile, loggedIn } from "../utils/spotifyUtil";
import PlaylistTile from "../components/playlist-tile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

/*   useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = loggedIn();

    // If the user is not logged in, redirect to the home screen
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);
 */

  const playlistData = getPlaylists();
  const profileData = getProfile();

  const playlistTiles = (
    <>
      {playlistData.items.map((playlist) => (
        <PlaylistTile
          className=""
          key={playlist.id}
          playlistId={playlist.id}
          img={playlist.images[0].url}
          playlistName={playlist.name}
        ></PlaylistTile>
      ))}
    </>
  );

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="container is-flex is-flex-direction-column is-justify-content-center">
          <div className="section"></div>
          <div className="is-flex-direction-column is-justify-content-center">
            <h2 className="is-flex display-name m-3 title">
              Playlists - {profileData.display_name}
            </h2>
            <div className="my-div is-justify-content-center is-flex is-flex-wrap-wrap">
              {playlistTiles}
            </div>
          </div>
          <div className="section"></div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
