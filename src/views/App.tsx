import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { inject } from "./setup/inject";
import { router } from "./setup/router";

const rootElement = document.getElementById("root");

if (rootElement == null) {
  throw new Error("Couldn't find the root element");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

inject().catch((error) => {
  console.error(error);
});
