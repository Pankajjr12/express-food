import React from "react";
import { FaDivide } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="section-container gradient bg-background bg-cover bg-center space-y-5 ">
      <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-6 ">
        <div className=" h-17 md:h-18 md:w-1/2 mt-10 ">
          <h2 className="md:text-5xl text-white text-2xl font-bold leading-snug md:leading-snug pr-10">
            We’re bringing <span className="text-blue text-animation">delicious</span> to your
            doorstep.
          </h2>
          <p className="text-xl text-[#dadada] lg:mt-5">
            You’re not just hungry, you’re starving.
          </p>
          <button className="btn btn-outline px-2 mt-10 lg:mt-32 font-bold ">Order now</button>
        </div>
        
      </div>

    </div>
  );
};

export default Banner;
