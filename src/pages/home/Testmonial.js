import React from "react";
import { FaStar } from "react-icons/fa";

const Testmonial = () => {
  return (
    <div className="section-container py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img
            src="/images/testimonial.png"
            className="md:w-full w-1/2 h-auto"
          />
        </div>
        <div className="md:w-1/2 space-y-1 md:space-y-3  bg-white p-8 rounded-lg">
          <div className="text-left md:w-4/5">
            <p className="subtitle ">Testimonials</p>
            <h1 className="text-bold text-4xl text-maroon">Know what our customers say about us</h1>
            <p className="  text-secondary leading-[30px]">
              "I had the great experience in ordering the food from this app.
              The customer service is best provided here!"
            </p>
            <div className="flex items-center gap-4 flex-wrap mt-4">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse  ">
                <div className="avatar">
                  <div className="w-12">
                    <svg
                      class=" text-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <svg
                      class=" text-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <svg
                      class=" text-red"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <svg
                      class=" text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className=" text-sm md:text-lg font-semibold ">
                  Customer FeedBack
                </h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>{" "}
                  <span className="text-[#807E7E]">(10.4 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testmonial;
