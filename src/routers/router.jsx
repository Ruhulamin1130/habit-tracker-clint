import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import AddHabit from "../Pages/AddHabit/AddHabit";
import MyHabits from "../Pages/MyHabits/MyHabits";
import BrowsePublicHabit from "../Pages/BrowserPublicHabit/BrowsePublicHabit";
import Error from "../Pages/Error/Error";
import HabitDetails from "../Pages/HabitDetails/HabitDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/habit"),
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
      {
        path: "/public-habit",
        element: <BrowsePublicHabit></BrowsePublicHabit>,
      },
      {
        path: "habitdetails",
        element: (
          <PrivateRoute>
            <HabitDetails></HabitDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/addhabit",

        element: (
          <PrivateRoute>
            <AddHabit></AddHabit>
          </PrivateRoute>
        ),
      },
      {
        path: "/myhabit",
        element: (
          <PrivateRoute>
            <MyHabits></MyHabits>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

export default router;
