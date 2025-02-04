import { useState } from "react";
import React from "react";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import { CropsData } from "../../../backend/models/cropData"; 

const Crops = () => {
  const [crop, setCrop] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    const foundCrop = CropsData.find(
      (c) => c.crop_name.toLowerCase() === crop.toLowerCase()
    );

    if (foundCrop) {
      setSelectedCrop(foundCrop);
    } else {
      setSelectedCrop(null);
      setError("Crop not found. Please enter a valid crop name.");
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mx-auto mt-8 px-6">
        {/* Search Section */}
        <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-lg mx-auto mb-8">
          <h1 className="text-2xl font-bold text-green-600 text-center">
            Crop Information
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter Crop Name"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>

        {/* Results Section */}
        {selectedCrop ? (
          <div className="bg-green-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
            {/* Image Container (Made Wider) */}
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <img
                src={selectedCrop.imageUrl}
                alt={selectedCrop.crop_name}
                className="rounded-lg w-full h-48 object-cover" // ✅ Increased width & height
              />
              <p className="text-lg font-bold text-center mt-4">
                {selectedCrop.crop_name}
              </p>
            </div>
            {/* Crop Details */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Crop Details
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold">Description:</span>{" "}
                {selectedCrop.crop_description}
              </p>
              {selectedCrop.nutrients && (
                <p className="text-gray-700">
                  <span className="font-semibold">Nutrients:</span>{" "}
                  {selectedCrop.nutrients}
                </p>
              )}
              <h3 className="text-xl font-semibold text-green-500 mt-6 mb-2">
                Best Growing Regions:
              </h3>
              <p className="text-gray-700">{selectedCrop.areas.join(", ")}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Enter a crop name to show details.
          </p>
        )}
      </div>
    </>
  );
};

export default Crops;
