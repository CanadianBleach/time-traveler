import "bulma/css/bulma.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./src/routes/root";
import ErrorPage from "./src/error-page";

// Page imports
import Dashboard from "./src/routes/playlist-dashboard";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
