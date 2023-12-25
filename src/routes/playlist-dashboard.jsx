import { fetchPlaylists, isLoggedIn, refreshTokenClick } from "../utils/spotifyUtil";
import "../css/dashboard.css";
import NavBar from "../components/navbar";
import { Link } from "react-router-dom";

let data;

if (isLoggedIn()) {
  data = await fetchPlaylists();
}

function Dashboard() {
  let playlists = data.items;
  let dashboard = <></>;

  if (!isLoggedIn()) {
    window.location.href = "./";
    console.warn("Not logged in");
  }

  if (playlists) {
    dashboard = (
      <>
        {playlists.map(function (playlist) {
          return (
            <>
              <Link target="#blank" to={playlist.external_urls.spotify} key={playlist.id} className="m-2">
                <div className="">
                  <figure className="image is-128x128">
                    <img
                      className="p-1"
                      src={playlist.images[0].url}
                      alt={playlist.name}
                    ></img>
                  </figure>
                </div>
              </Link>
            </>
          );
        })}
      </>
    );
  } else {
    console.warn("NO PLAYLISTS LOADED");
    dashboard = (
      <>
        <h3>No playlists to show... get on that girl.</h3>
        <button className="btn btn-primary" onClick={refreshTokenClick}>Refresh Login</button>
      </>
    );
  }

  return (
    <>
      <section className="hero is-fullheight">
        <NavBar></NavBar>
        <div className="hero-body is-flex is-flex-direction-column">
          <h2 className="title has-text-center">Playlists</h2>
          <div className="container is-flex is-flex-wrap-wrap is-justify-content-flex-start">
            {dashboard}
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
