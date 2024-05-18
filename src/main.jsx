import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {createBrowserRouter,
  RouterProvider} from "react-router-dom";

import {Home,
  Auth} from "./pages/index.js";

import {
  FeedBack} from "./components/index.js";

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:([
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/register",
        element:<Auth/>,
      },
      {
        path:"/login",
        element:<Auth/>,
      },
      {
        path:"/feedback",
        element:<FeedBack/>,
      },
    ]),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </RouterProvider>
)
