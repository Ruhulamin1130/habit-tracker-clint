import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
// import { FaGear, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  // 🌙 Theme toggle state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const navItemClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-pink-600 border-b-2 border-pink-500"
        : "text-gray-700 hover:text-pink-600"
    }`;

  const links = (
    <>
      <NavLink to="/" className={navItemClass}>
        Home
      </NavLink>
      <NavLink to="/public-habit" className={navItemClass}>
        Browse Public Habits
      </NavLink>
      {user && (
        <>
          <NavLink to="/addhabit" className={navItemClass}>
            Add Habit
          </NavLink>
          <NavLink to="/myhabit" className={navItemClass}>
            My Habits
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900 backdrop-blur-lg border-b border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
      <div className="w-11/12 mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-pink-600 transition"
        >
          Habit<span className="text-pink-600">Tracker</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6">{links}</nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={handleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:scale-105 transition-all"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-gray-300 dark:border-gray-600 hover:scale-105 transition"
              >
                <div className="w-9 rounded-full">
                  <img
                    alt="user avatar"
                    referrerPolicy="no-referrer"
                    src={
                      user.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-white dark:bg-gray-800 rounded-xl w-52 border border-gray-100 dark:border-gray-700"
              >
                <li className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-200 text-sm">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-pink-600 flex items-center gap-2"
                  >
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="hover:text-pink-600 flex items-center gap-2"
                  >
                    <FaGear /> Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={signOutUser}
                    className="btn btn-sm w-full mt-2 bg-pink-500 text-white hover:bg-pink-600 border-none flex items-center justify-center gap-2"
                  >
                    <IoLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="btn btn-sm bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full flex items-center gap-2"
            >
              <IoLogIn /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-gray-700 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-100 dark:border-gray-700"
          >
            {links}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
