import React, { useState } from "react";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import { SoilData } from "../../../backend/models/soilData"; // ✅ Import soil data

const Soil = () => {
  const [district, setDistrict] = useState("");
  const [selectedSoil, setSelectedSoil] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    const foundSoil = SoilData.find(
      (s) => s.district.toLowerCase() === district.toLowerCase()
    );

    if (foundSoil) {
      setSelectedSoil(foundSoil);
    } else {
      setSelectedSoil(null);
      setError("District not found. Please enter a valid district name.");
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mx-auto mt-8 px-6">
        {/* Search Section */}
        <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-lg mx-auto mb-8">
          <h1 className="text-2xl font-bold text-green-600 text-center">
            Soil Information
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter District Name"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
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
        {selectedSoil ? (
          <div className="bg-green-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <img
                src={selectedSoil.imageUrl}
                alt={selectedSoil.district}
                className="rounded-lg w-full h-48 object-cover" // ✅ Increased image width & height
              />
              <p className="text-lg font-bold text-center mt-4">
                {selectedSoil.district}
              </p>
            </div>

            {/* Soil Details Section */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Soil Details
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold">Soil Type:</span>{" "}
                {selectedSoil.soil_type}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Nutrients:</span>{" "}
                {selectedSoil.nutrients}
              </p>
              <h3 className="text-xl font-semibold text-green-500 mt-6 mb-2">
                Suitable Crops:
              </h3>
              <p className="text-gray-700">{selectedSoil.crops.join(", ")}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Enter a district name to show soil details.
          </p>
        )}
      </div>
    </>
  );
};

export default Soil;
