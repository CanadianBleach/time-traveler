import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// Page imports
import Dashboard from "./routes/playlist-dashboard";
import Tracklist from "./routes/tracklist";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "tracklist/:playlist_id",
        element: <Tracklist />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);