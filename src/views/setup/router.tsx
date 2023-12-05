import { Role } from "@prisma/client";
import { appActions, appState } from "@views/valtio";
import { createBrowserRouter, redirect } from "react-router-dom";

import AdminRoot from "../pages/Admin";
import AccountsPage from "../pages/Admin/Accounts";
import GreetingPage from "../pages/Admin/Greeting";
import LoginPage from "../pages/Admin/Login";
import OrdersPage from "../pages/Admin/Orders";
import ProductsPage from "../pages/Admin/Products";
import AdminProfile from "../pages/Admin/Profile";
import CartPage from "../pages/Cart";
import Checkout from "../pages/Checkout";
import HomePage from "../pages/Home";
import LogIn from "../pages/LogIn";
import Orders from "../pages/Orders";
import ProductDetails from "../pages/ProductDetails";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import RootPage from "../pages/Root";

const authLoader = async () => {
  await appActions.waitForInjecting();
  if (appState.profile == null) return redirect("/login");
  return null;
};

const adminAuthLoader = async () => {
  await appActions.waitForInjecting();
  if (appState.profile == null) return redirect("/admin/login");
  if (appState.profile.user.role !== Role.ADMIN) {
    appActions.logout();
    return redirect("/admin/login");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/categories/:category",
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
        loader: authLoader,
      },
      {
        path: "/cart",
        element: <CartPage />,
        loader: authLoader,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: authLoader,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: authLoader,
      },
      {
        path: "*",
        loader: async () => redirect("/"),
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
        loader: adminAuthLoader,
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
      {
        path: "*",
        loader: async () => redirect("/admin"),
      },
    ],
  },
]);
