import React from "react";
import { Link } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-green-100 h-20">
      <div className="flex justify-between h-full items-center p-2 text-green-400">
        <div className="ml-3 p-3 text-3xl">AgroVision</div>
        <div className="flex w-1/5 justify-evenly">
          <Link to="/about" className="cursor-pointer">
            About
          </Link>
          <Link
            to="/login"
            className="cursor-pointer bg-white rounded-2xl p-1 px-4"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
