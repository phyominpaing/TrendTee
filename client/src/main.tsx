import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { Toaster } from "sonner";
import Profile from "./pages/Profile.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ProductFilter from "./pages/ProductFilter.tsx";
import IsAdmin from "./pages/protector/isAdmin.tsx";
import IsLogin from "./pages/protector/IsLogin.tsx";
import Panel from "./pages/admin/Panel.tsx";
import ProductCreate from "./pages/admin/ProductCreate.tsx";
import ProductUpdate from "./pages/admin/ProductUpdate.tsx";
import ProductManagement from "./pages/admin/ProductManagement.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import { PersistGate } from "redux-persist/integration/react";
import ConfirmOrder from "./pages/order/ConfirmOrder.tsx";
import Cancelled from "./pages/order/Cancelled.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/reset-password/:id",
        element: <ResetPassword />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/filter",
        element: <ProductFilter />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "/admin/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/admin/manage-users",
            element: <UserManagement />,
          },
          {
            path: "/admin/manage-products",
            element: <ProductManagement />,
          },
          {
            path: "/admin/create-product",
            element: <ProductCreate />,
          },
          {
            path: "/admin/edit-product/:id",
            element: <ProductUpdate />,
          },
        ],
      },
      {
        path: "/order-success",
        element: <ConfirmOrder />,
      },
      {
        path: "/order-cancelled",
        element: <Cancelled />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster richColors />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
