import { Role } from "@prisma/client";
import OrderDetails from "@views/components/Orders/OrderDetails";
import CategoriesPage from "@views/pages/Admin/Categories";
import AdminDashboard from "@views/pages/Admin/Dashboard";
import { appActions, appState } from "@views/valtio";
import { createBrowserRouter, redirect } from "react-router-dom";

import AdminRoot from "../pages/Admin";
import AccountsPage from "../pages/Admin/Accounts";
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
        path: "/orders/:id",
        element: <OrderDetails />,
        loader: authLoader,
      },
      {
        path: "*",
        loader: async () => redirect("/"),
      },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
        loader: adminAuthLoader,
      },
      {
        path: "profile",
        element: <AdminProfile />,
        loader: adminAuthLoader,
      },
      {
        path: "accounts",
        element: <AccountsPage />,
        loader: adminAuthLoader,
      },
      {
        path: "products",
        element: <ProductsPage />,
        loader: adminAuthLoader,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
        loader: adminAuthLoader,
      },
      {
        path: "orders",
        element: <OrdersPage />,
        loader: adminAuthLoader,
      },
      {
        path: "*",
        loader: async () => redirect("/admin"),
      },
    ],
  },
]);
