import "../css/global-styles.css";
import NavBar from "../components/navbar";
import Login from "../components/login";
import Playlists from "../components/playlists";

function Root() {
  return (
    <>
      <section className="hero is-fullheight">
      <NavBar></NavBar>
      </section>
    </>
  );
}

export default Root;
