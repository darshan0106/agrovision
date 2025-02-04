import React, { useState } from "react";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch("http://localhost:3000/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city }),
      });

      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.error || "Failed to fetch weather data");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PrivateNavbar />
      <div className="container mx-auto mt-8 px-6">
        {/* Search Section */}
        <div className="bg-green-100 p-6 rounded-xl shadow-md max-w-lg mx-auto mb-8">
          <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
            Weather Update
          </h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={handleCityChange}
              className="flex-grow border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-200"
            >
              Search
            </button>
          </div>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>

        {/* Weather Data Display */}
        {!weatherData && !loading && (
          <p className="text-center text-gray-500 w-full">
            Enter city name to view forecast.
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-500 w-full">Loading...</p>
        )}

        {weatherData && (
          <div className="bg-green-100 p-6 rounded-xl shadow-md mx-auto max-w-md w-full text-center">
            {/* Weather Icon & Temperature */}
            <div className="flex flex-col items-center">
              <img
                src={weatherData.iconUrl}
                alt="Weather Icon"
                className="w-20 h-20"
              />
              <p className="text-4xl font-bold text-gray-700 mt-4">
                {weatherData.temperature}°C
              </p>
              <p className="text-lg text-gray-500">{weatherData.description}</p>
            </div>

            {/* Weather Details */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Forecast & Details
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-semibold">Max Temp:</span>{" "}
                  {weatherData.maxTemp}°C
                </li>
                <li>
                  <span className="font-semibold">Min Temp:</span>{" "}
                  {weatherData.minTemp}°C
                </li>
                <li>
                  <span className="font-semibold">Humidity:</span>{" "}
                  {weatherData.humidity}%
                </li>
                <li>
                  <span className="font-semibold">Wind Speed:</span>{" "}
                  {weatherData.windSpeed} m/s
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Weather;
