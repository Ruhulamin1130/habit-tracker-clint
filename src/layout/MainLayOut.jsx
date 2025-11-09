import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayOut = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default MainLayOut;
