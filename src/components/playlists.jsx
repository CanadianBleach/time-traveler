import { fetchPlaylists, isLoggedIn } from "../utils/spotifyUtil";

let playlists;

if (isLoggedIn()) {
  const data = await fetchPlaylists();
  playlists = data.items;
}

function Playlists() {
  return (
    <>
      <div className="m-6">Playlists</div>
      {playlists.map(function (data) {
        return (
          <div key={data.id}>
            <img src={data.images[0].url}></img>
          </div>
        );
      })}
    </>
  );
}

export default Playlists;
