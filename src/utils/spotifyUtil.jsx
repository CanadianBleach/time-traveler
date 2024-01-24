import dayjs from "dayjs";
import { func } from "prop-types";
import { json } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const clientId = import.meta.env.VITE_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email";

// Data structure that manages the current active token, caching it in localStorage
const currentToken = {
  get access_token() {
    return localStorage.getItem("access_token") || null;
  },
  get refresh_token() {
    return localStorage.getItem("refresh_token") || null;
  },
  get expires_in() {
    return localStorage.getItem("refresh_in") || null;
  },
  get expires() {
    return localStorage.getItem("expires") || null;
  },

  save: function (response) {
    const { access_token, refresh_token, expires_in } = response;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("expires_in", expires_in);

    const now = new Date();
    const expiry = new Date(now.getTime() + expires_in * 1000);
    localStorage.setItem("expires", expiry);
  },
};

async function fetchProfile() {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: "Bearer " + currentToken.access_token },
  });

  return await response.json();
}

function getProfile() {
  return JSON.parse(localStorage.getItem("user_profile"));
}

async function fetchPlaylists() {
  const response = await fetch(
    "https://api.spotify.com/v1/me/playlists?limit=50",
    {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }
  );

  return await response.json();
}

// Returns playlists from localstorage
function getPlaylists() {
  return JSON.parse(localStorage.getItem("user_playlists"));
}

const getPlaylistsIn = (songId) => {
  const tracks = getTracks();
  let foundIn = [];
  for (let t in tracks) {
    if (tracks[t].id == songId) {
      foundIn.push(tracks[t]);
    }
  }

  return foundIn;
};

//Gets specific playlist by id
function getTrack(trackId) {
  let tracks = getTracks();
  for (let t in tracks) {
    if (tracks[t].id == trackId) {
      return tracks[t];
    }
  }

  return null;
}

//Gets specific playlist by id
function getPlaylist(playlistId) {
  let playlistData = getPlaylists();
  let playlists = playlistData.items;
  for (let p in playlists) {
    if (playlists[p].id == playlistId) {
      return playlists[p];
    }
  }

  return null;
}

async function fetchTracks(playlist_id) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=0&limit=100`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + currentToken.access_token },
    }
  );

  return await response.json();
}

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

// If we find a code, we're in a callback, do a token exchange
if (code) {
  const token = await getToken(code);
  currentToken.save(token);

  // Remove code from URL so we can refresh correctly.
  const url = new URL(window.location.href);
  url.searchParams.delete("code");

  const updatedUrl = url.search ? url.href : url.href.replace("?", "");
  window.history.replaceState({}, document.title, updatedUrl);
}

function getDuplicatesFromId(playlistId) {
  const tracks = getTracks();
  let dupes = [];
  for (let t in tracks) {
    if (tracks[t].foundIn.includes(playlistId) && tracks[t].count > 1)
      dupes.push(tracks[t]);
  }

  return dupes;
}

async function profileInit() {
  const userData = await fetchProfile();
  const playlistData = await fetchPlaylists();
  const songs = await createSongStruct(playlistData.items);

  // TODO: Add to mongo
  localStorage.setItem("user_profile", JSON.stringify(userData));
  localStorage.setItem("user_playlists", JSON.stringify(playlistData));
  localStorage.setItem("user_tracks", JSON.stringify(songs));

  return true;
}

async function createSongStruct(playlists) {
  let songs = [];

  // Add songs
  for (let p in playlists) {
    const currList = await fetchTracks(playlists[p].id);
    for (let s in currList.items) {
      // Push track and playlist to array
      songs.push({
        track: currList.items[s].track,
        playlistId: playlists[p].id,
      });
    }
  }

  // Remove duplicates
  let returnData = [];

  // Loop thorugh all songs
  for (let s in songs) {
    if (songs[s] == null) break;

    // Handle spotify local files
    let id = uuidv4();
    if (songs[s].track.id) id = songs[s].track.id;

    for (let d in returnData) {
      // We found a song we have, update info
      if (returnData[d].id == id) {
        returnData[d].count++;
        returnData[d].foundIn.push(songs[s].playlistId);
        break;
      }
    }

    // Song was not a duplicate create base object for song
    let songObj = {
      track: songs[s].track,
      id: id,
      count: 1,
      foundIn: [songs[s].playlistId],
    };

    returnData.push(songObj);
  }

  console.log("returnData", returnData);
  return returnData;
}

function getTracks() {
  return JSON.parse(localStorage.getItem("user_tracks"));
}

async function redirectToSpotifyAuthorize() {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomValues = crypto.getRandomValues(new Uint8Array(64));
  const randomString = randomValues.reduce(
    (acc, x) => acc + possible[x % possible.length],
    ""
  );

  const code_verifier = randomString;
  const data = new TextEncoder().encode(code_verifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);

  const code_challenge_base64 = btoa(
    String.fromCharCode(...new Uint8Array(hashed))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  window.localStorage.setItem("code_verifier", code_verifier);

  const authUrl = new URL(authorizationEndpoint);
  const params = {
    response_type: "code",
    client_id: clientId,
    scope: scope,
    code_challenge_method: "S256",
    code_challenge: code_challenge_base64,
    redirect_uri: redirectUrl,
  };

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString(); // Redirect the user to the authorization server for login
}

// Soptify API Calls
async function getToken(code) {
  const code_verifier = localStorage.getItem("code_verifier");

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUrl,
      code_verifier: code_verifier,
    }),
  });

  return await response.json();
}

async function refreshToken() {
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: currentToken.refresh_token,
    }),
  });

  return await response.json();
}

// Click handlers
async function loginWithSpotifyClick() {
  localStorage.setItem("logged_in", false);
  await redirectToSpotifyAuthorize();
}

async function logoutClick() {
  localStorage.clear();
  window.location = "../";
}

async function refreshTokenClick() {
  const token = await refreshToken();
  currentToken.save(token);
  window.location.reload();
}

function loggedIn() {
  return localStorage.getItem("logged_in");
}

function tokenExpired() {
  const now = new Date();
  const expiry = new Date(localStorage.getItem("expires"));

  return false;
}

export {
  fetchPlaylists,
  fetchProfile,
  loginWithSpotifyClick,
  loggedIn,
  logoutClick,
  fetchTracks,
  refreshTokenClick,
  getProfile,
  getPlaylists,
  getPlaylist,
  getTracks,
  getDuplicatesFromId,
  tokenExpired,
  profileInit,
  getPlaylistsIn,
  getTrack,
};
