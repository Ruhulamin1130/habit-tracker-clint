import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
    ],
  },
]);

export default router;
