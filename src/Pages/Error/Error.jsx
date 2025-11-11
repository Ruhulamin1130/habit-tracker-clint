import React from "react";
import imgs from "../../assets/error-404.png";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="w-11/12 mx-auto">
      <div className="my-2 flex justify-center items-center">
        <img className="text-center" src={imgs} alt="" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold  my-4">
          {" "}
          Pages Not Found !! Error 404
        </h2>
        <Link className="btn btn-primary" to={"/"}>
          Go Homoe
        </Link>
      </div>
    </div>
  );
};

export default Error;
