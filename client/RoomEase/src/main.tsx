import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import NotFoundErrorPage from "./routes/NotFoundErrorPage";
import HomePage from "./routes/HomePage";
import EmailVerificationPage from "./routes/EmailVerificationPage";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <RegisterPage />
  },
  {
    path: "/verifyemail",
    element: <EmailVerificationPage />,
    children: [
      {
        path: ":verificationCode",
        element: <EmailVerificationPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} toastOptions={{defaultOptions: {position: "top-right", duration: 3000, isClosable: true}}}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
