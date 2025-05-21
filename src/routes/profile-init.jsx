import "../css/dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { profileInit } from "../utils/spotifyUtil";

function ProfileInit() {
  const navigate = useNavigate();
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Handle not logged in
  useEffect(() => {
    // Set up profile
    (async () => {
      setProfileLoaded(false);
      const profileCreated = await profileInit();

      if (profileCreated) {
        setProfileLoaded(true);
        console.log("profile-created");
        localStorage.setItem("logged_in", true);
        window.location.href = "../dashboard";
      }
    })();
  }, [navigate]);

  return (
    <>
      <section className="hero is-fullheight">
        <div className="hero-body has-text-centered is-flex-direction-column is-justify-content-space-evenly mb-5">
          <div className="m-6">
            <h2 className="title is-3 has-text-dark">
              Setting up your profile... this could take a minute.
            </h2>
            <progress className="progress is-small" max="100"></progress>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileInit;
