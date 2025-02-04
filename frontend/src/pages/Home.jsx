import React from "react";
import { useNavigate } from "react-router-dom";
import { WiDaySunny } from "react-icons/wi"; // Weather icon
import { GiPlantWatering, GiSeedling, GiPlantRoots } from "react-icons/gi";
import Card from "../components/Card";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";

const Home = () => {
  const navigate = useNavigate(); // ✅ Used for navigation

  const cardsData = [
    {
      title: "Weather Updates",
      subtitle: "Stay updated with local weather conditions.",
      buttonText: "View Forecast",
      icon: WiDaySunny,
      path: "/weather", // ✅ Navigation path
    },
    {
      title: "Know Your Soil",
      subtitle: "Discover soil types and properties in your area.",
      buttonText: "Analyze Soil",
      icon: GiPlantWatering,
      path: "/soil",
    },
    {
      title: "What to Grow?",
      subtitle: "Find the best crops for your region.",
      buttonText: "Explore Crops",
      icon: GiSeedling,
      path: "/crop",
    },
    {
      title: "Plant Disease Guide",
      subtitle: "Identify, prevent, and treat common plant diseases.",
      buttonText: "View Diseases",
      icon: GiPlantRoots,
      path: "/diseases",
    },
  ];

  return (
    <>
      <PrivateNavbar />
      <div className="flex items-center justify-center min-h-screen">
        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-8">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              subtitle={card.subtitle}
              buttonText={card.buttonText}
              icon={card.icon}
              onClick={() => navigate(card.path)} // ✅ Navigate on click
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
