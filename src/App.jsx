import "bulma/css/bulma.min.css";
import "./css/styles.css";
import SiteNav from "./components/navbar";
import Login from "./components/login";
import Playlists from "./components/playlists";

function App() {
  return (
    <>
      <section className="hero is-fullheight">
        <SiteNav></SiteNav>
        <div className="hero-body has-text-centered is-flex-direction-column is-justify-content-space-evenly mb-5">
          <Login></Login>
        </div>
      </section>
    </>
  );
}

export default App;
