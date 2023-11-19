import React from "react";
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoot from "./pages/UserRoot";
import AdminRoot from "./pages/AdminRoot";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import CartPage from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
