import React from "react";
import { FaCloudSun, FaSeedling, FaPagelines, FaLeaf, FaShieldAlt } from "react-icons/fa";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import PlantImage from "../assets/plant.jpeg";

const Landing = () => {
  return (
    <>
      <PublicNavbar />
      <h1 className="text-center text-4xl text-white mt-28 font-bold">
        Welcome to AgroVision
      </h1>
      <h2 className="text-center mt-3 text-2xl text-white font-semibold">
        Your All-in-One Agricultural Assistant
      </h2>
      <div className="flex justify-center items-center">
        <div className="bg-green-100 mt-16 opacity-90 mx-40 rounded-xl flex justify-between h-80 p-8 items-center w-3/5 shadow-lg">
          <div className="ml-5">
            <ul className="text-xl space-y-4">
              <li className="flex items-center">
                <FaCloudSun className="text-green-600 mr-3 text-2xl" />
                <span>Stay Ahead of the Weather</span>
              </li>
              <li className="flex items-center">
                <FaSeedling className="text-green-600 mr-3 text-2xl" />
                <span>Understand Your Soil</span>
              </li>
              <li className="flex items-center">
                <FaPagelines className="text-green-600 mr-3 text-2xl" />
                <span>Discover Ideal Crops</span>
              </li>
              <li className="flex items-center">
                <FaLeaf className="text-green-600 mr-3 text-2xl" />
                <span>Optimize with Fertilizers</span>
              </li>
              <li className="flex items-center">
                <FaShieldAlt className="text-green-600 mr-3 text-2xl" />
                <span>Protect with Confidence</span>
              </li>
            </ul>
          </div>
          <div>
            <img
              className="h-60 w-80 rounded-xl shadow-md border-2 border-green-200"
              src={PlantImage}
              alt="plant-image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
