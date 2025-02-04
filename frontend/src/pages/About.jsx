import React from "react";
import PublicNavbar from "../components/Navbar/PublicNavbar"; // Assuming this is for non-logged-in users

const About = () => {
  return (
    <>
      <PublicNavbar />
      <div className="container mx-auto mt-8 px-6">
        {/* About Section */}
        <div className="bg-green-100 p-8 rounded-xl shadow-md max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
            About AgroVision
          </h1>
          <p className="text-gray-700 text-lg text-center">
            AgroVision is an advanced agricultural platform designed to help
            farmers and agricultural enthusiasts make informed decisions.
            Whether you need real-time weather updates, soil analysis, crop
            recommendations, or guidance on plant diseases, our platform
            provides all the essential information to improve your agricultural
            productivity.
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white p-8 mt-6 rounded-xl shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-600 mb-4 text-center">
            Why Choose AgroVision?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            <li>
              🌱 **Know Your Soil** – Discover soil types and the best crops for
              your region.
            </li>
            <li>
              🌾 **Crop Recommendations** – Find which crops thrive in different
              soil conditions.
            </li>
            <li>
              ☀️ **Weather Updates** – Get real-time weather data for your area.
            </li>
            <li>
              🛡 **Plant Disease Guide** – Identify and prevent common plant
              diseases.
            </li>
            <li>
              🧪 **Fertilizer & Pesticide Guide** – Choose the best fertilizers
              and treatments.
            </li>
          </ul>
        </div>

        {/* Developer Info Section */}
        <div className="bg-green-50 p-6 mt-6 rounded-xl shadow-md max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-green-600 mb-2">
            Developed By
          </h2>
          <p className="text-gray-700 text-lg">Praveena K</p>
          <p className="text-gray-600">
            Dr.N.G.P. Arts and Science College, Coimbatore
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
