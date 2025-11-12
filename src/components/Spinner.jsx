import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100">
      <FaSpinner className="text-5xl text-pink-500 animate-spin" />
    </div>
  );
};

export default Spinner;
