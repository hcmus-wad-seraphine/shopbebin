import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AdminRoot from "./pages/Admin";
import AccountsPage from "./pages/Admin/Accounts";
import GreetingPage from "./pages/Admin/Greeting";
import OrdersPage from "./pages/Admin/Orders";
import ProductsPage from "./pages/Admin/Products";
import ProfilePage from "./pages/Admin/Profile";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import LogIn from "./pages/LogIn";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import UserRoot from "./pages/UserRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserRoot />,
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
        path: "profile",
        element: <ProfilePage />,
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
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/products/:id",
    element: <ProductDetails />,
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
