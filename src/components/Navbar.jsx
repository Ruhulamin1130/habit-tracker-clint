import React, { use } from "react";
import { FaGear, FaUser } from "react-icons/fa6";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const links = (
    <>
      <NavLink to={"/"}>
        <li>
          <a>Home</a>
        </li>
      </NavLink>
      <NavLink to={"/public-habit"}>
        <li>
          <a>Browse Public Habits</a>
        </li>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="w-11/12 mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="btn bg-linear-to-r from-pink-500 to-red-600 text-xl"
          >
            Habit-Tracker
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {/* end here for user */}
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-9 border-2 border-gray-300 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <div className=" pb-3 border-b border-b-gray-200">
                  <li className="text-sm font-bold">{user.displayName}</li>
                  <li className="text-xs">{user.email}</li>
                </div>
                <li className="mt-3">
                  <Link to={"/profile"}>
                    <FaUser /> Profile
                  </Link>
                </li>

                <li>
                  <a>
                    {" "}
                    <FaGear /> Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={signOutUser}
                    className="btn btn-xs text-left bg-linear-to-r from-pink-500 to-red-500 text-white"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/auth/login"}
              className="btn rounded-full border-gray-300  btn-sm bg-linear-to-r from-pink-500 to-red-500 text-white"
            >
              {" "}
              <IoLogIn /> Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
