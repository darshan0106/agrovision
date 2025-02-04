import { useState } from "react";
import React from "react";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import { DiseasesData } from "../../../backend/models/diseasesData"; // ✅ Import disease data

const Diseases = () => {
  const [disease, setDisease] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    const foundDisease = DiseasesData.find(
      (d) => d.diseases_name.toLowerCase() === disease.toLowerCase()
    );

    if (foundDisease) {
      setSelectedDisease(foundDisease);
    } else {
      setSelectedDisease(null);
      setError("Disease not found. Please enter a valid disease name.");
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mx-auto mt-8 px-6">
        {/* Search Section */}
        <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-lg mx-auto mb-8">
          <h1 className="text-2xl font-bold text-green-600 text-center">
            Plant Disease Information
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter Disease Name"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
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
        {selectedDisease ? (
          <div className="bg-green-100 p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6 max-w-3xl mx-auto">
            {/* Image Container */}
            <div className="w-full md:w-1/2 bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
              <img
                src={selectedDisease.imageUrl}
                alt={selectedDisease.diseases_name}
                className="rounded-lg w-full h-48 object-cover"
              />
              <p className="text-lg font-bold text-center mt-4">
                {selectedDisease.diseases_name}
              </p>
            </div>

            {/* Disease Details */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Disease Details
              </h2>
              <p className="text-gray-700">
                <span className="font-semibold">Causes:</span>{" "}
                {selectedDisease.causes}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Prevention:</span>{" "}
                {selectedDisease.prevent}
              </p>
              <h3 className="text-xl font-semibold text-green-500 mt-6 mb-2">
                Fungicides & Disease Control Solutions:
              </h3>
              <p className="text-gray-700">{selectedDisease.pesticides}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            Enter a disease name to show details.
          </p>
        )}
      </div>
    </>
  );
};

export default Diseases;
