import dayjs from "dayjs";
import { json } from "react-router-dom";

const clientId = "865e4635c0004d49b740988d9b45e19d";

const authorizationEndpoint = "https://accounts.spotify.com/authorize";
const tokenEndpoint = "https://accounts.spotify.com/api/token";
const scope = "user-read-private user-read-email";

// For production vs dev
let redirectUrl;
redirectUrl = "http://localhost:5173/dashboard";
//redirectUrl = "https://time-traveler.vercel.app/dashboard";

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

function getPlaylists() {
  return JSON.parse(localStorage.getItem("user_playlists"));
}

function getPlaylist(playlistId) {
  let playlists = getPlaylists();
  for (let p in playlists) {
    if (playlists[p].id == playlistId) return playlists[p];
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

  // Fetch and setup profile
  await profileInit();
}

async function profileInit() {
  let userData = await fetchProfile();
  let playlistData = await fetchPlaylists();

  // Todo setup user
  // Add to mongo
  localStorage.setItem("user_profile", JSON.stringify(userData));
  localStorage.setItem("user_playlists", JSON.stringify(playlistData.items));
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
  return getProfile();
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
};
