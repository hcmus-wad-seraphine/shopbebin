import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserRoot from "./pages/UserRoot";
import AdminRoot from "./pages/Admin";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import CartPage from "./pages/Cart";
import Checkout from "./pages/Checkout";
import GreetingPage from "./pages/Admin/Greeting";
import ProfilePage from "./pages/Admin/Profile";
import AccountsPage from "./pages/Admin/Accounts";
import ProductsPage from "./pages/Admin/Products";
import OrdersPage from "./pages/Admin/Orders";
import ProductDetail from "./pages/ProductDetail";

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
    element: <ProductDetail />,
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
