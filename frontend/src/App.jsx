import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Weather from "./pages/Weather";
import Soil from "./pages/Soil";
import Crops from "./pages/Crops";
import Diseases from "./pages/Diseases";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/soil" element={<Soil />} />
        <Route path="/crop" element={<Crops />} />
        <Route path="/diseases" element={<Diseases />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
