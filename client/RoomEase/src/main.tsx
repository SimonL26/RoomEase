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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right"
      autoClose={3000}
      hideProgressBar={true}/>
    </ChakraProvider>
  </React.StrictMode>
);
