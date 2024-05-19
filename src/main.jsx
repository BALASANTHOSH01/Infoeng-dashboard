import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Auth, SignUp } from "./pages/index.js";

import { FeedBack } from "./components/index.js";

import { AuthContextProvider } from "./Context/Auth&DB/Auth&DB.jsx";

import ProductRoute from "./ProductRoute/ProductRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Auth />,
      },
      {
        path: "/feedback",
        element: (
          <ProductRoute>
            <FeedBack />
          </ProductRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <AuthContextProvider>
  <RouterProvider router={router}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </RouterProvider>
      </AuthContextProvider>
);
