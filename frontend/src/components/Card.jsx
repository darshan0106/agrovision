import React from "react";

const Card = ({ title, subtitle, buttonText, icon: Icon, onClick }) => {
  return (
    <div
      className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 flex flex-col items-center justify-between h-72 w-80 cursor-pointer"
      onClick={onClick} // ✅ Make entire card clickable (optional)
    >
      <div className="flex flex-col items-center">
        <Icon size={50} className="mb-4 text-green-500" />{" "}
        {/* ✅ Better icon styling */}
        <h1 className="text-2xl font-semibold text-green-800 mb-2">{title}</h1>
        <p className="text-gray-600 text-center">{subtitle}</p>
      </div>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // ✅ Prevent card click from triggering twice
            onClick();
          }}
          className="bg-green-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-green-600 transition-transform duration-200 transform hover:scale-105"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
