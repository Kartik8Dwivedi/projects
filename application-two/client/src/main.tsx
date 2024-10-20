import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp.tsx";
import LogIn from "./components/LogIn/LogIn.tsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.tsx";
import HomePage from "./components/HomePage/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <LogIn />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
