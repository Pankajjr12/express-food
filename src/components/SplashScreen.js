import React from "react";
import { IoFastFood } from "react-icons/io5";

const SplashScreen = () => {
    console.log('opens')

  
  return (
    <div className="flex items-center justify-center h-screen bg-orange-400 text-white">
    <div className="text-center">
      <div className="btn btn-ghost md:text-xl">
        <IoFastFood
          size={32}
          className="text-white animate-bounce hover:animate-none"
        />
        <span className="text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Food Express
        </span>
      </div>
    </div>
  </div>
  
  );
};

export default SplashScreen;
