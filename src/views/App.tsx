import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminRoot from "./pages/Admin";
import AccountsPage from "./pages/Admin/Accounts";
import GreetingPage from "./pages/Admin/Greeting";
import LoginPage from "./pages/Admin/Login";
import OrdersPage from "./pages/Admin/Orders";
import ProductsPage from "./pages/Admin/Products";
import AdminProfile from "./pages/Admin/Profile";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import HomePage from "./pages/Home";
import LogIn from "./pages/LogIn";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RootPage from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
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
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <GreetingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: "accounts",
        element: <AccountsPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
    ],
  },
]);

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
