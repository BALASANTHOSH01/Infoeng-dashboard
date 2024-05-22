import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Auth, SignUp } from "./pages/index.js";

import { FeedBack } from "./components/index.js";

import { AuthContextProvider,UserContextProvider } from "./Context/index.js";

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
            <FeedBack />
          // <ProductRoute>
          // </ProductRoute>
        ),
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <RouterProvider router={router}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RouterProvider>

);
