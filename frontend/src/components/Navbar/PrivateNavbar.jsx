import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <nav className="bg-green-100 h-20">
      <div className="flex justify-between h-full items-center p-2 text-green-400">
        <div className="ml-3 p-3 text-3xl">AgroVision</div>
        <div className="flex w-2/5 justify-evenly">
          <Link to="/home" className="cursor-pointer">
            Home
          </Link>
          <Link to="/weather" className="cursor-pointer">
            Weather
          </Link>
          <Link to="/soil" className="cursor-pointer">
            Soil
          </Link>
          <Link to="/crop" className="cursor-pointer">
            Crops
          </Link>
          <Link to="/diseases" className="cursor-pointer">
            Diseases
          </Link>
          <div
            className="cursor-pointer bg-white rounded-2xl p-1 px-4"
            onClick={() => {
              // Add logout logic here
              navigate("/"); // Redirect to login after logout
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
