import React from "react";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoot from "./routes/UserRoot";
import AdminRoot from "./routes/AdminRoot";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserRoot />,
    },
    {
        path: "/admin",
        element: <AdminRoot />,
    },
]);

render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root")
);
