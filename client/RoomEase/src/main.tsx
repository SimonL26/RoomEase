import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Logins from "./routes/Logins";
import NotFoundErrorPage from "./routes/NotFoundErrorPage";
import Home from "./routes/Home";
import { theme } from "./theme";
import Register from "./routes/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: "/login",
    element: <Logins />
  },
  {
    path: "/signup",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
