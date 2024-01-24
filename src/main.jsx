import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// Page imports
import Dashboard from "./routes/playlist-dashboard";
import Tracklist from "./routes/tracklist";
import ProfileInit from "./routes/profile-init";
import FoundIn from "./routes/found-in";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-profile",
    element: <ProfileInit />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tracklist/:id",
    element: <Tracklist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/track-view/:id",
    element: <FoundIn />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
