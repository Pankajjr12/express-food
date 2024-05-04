import React, { useEffect } from "react";
import logo from "../../anim/food.jpg";

const About = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="section-container space-y-5 my-5 ">
      <div className="card card-compact w-full bg-base-100 shadow-xl flex flex-col lg:flex-row items-center lg:mt-10">
        <div className="w-full lg:w-1/3">
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="w-full lg:w-2/3 p-5">
          <h2 className="card-title">About us</h2>
          <p>
            If like a dish person deserves a chance to express himself that
            would be great ?
          </p>
          <div className="card-actions justify-end  text-justify text-wrap">
            <ul>
              <li>
                Welcome to{" "}
                <span className="font-bold  text-white">Food Express!</span> At
                Food Express, we're passionate about good food. Our mission is
                to bring you the best culinary experiences, right to your
                doorstep. Whether you're craving a hearty meal, a quick snack,
                or something sweet, we've got you covered.
              </li>
              <br />
              <li>
                <span className="underline text-white">Our Story</span>: Food
                Express started with a simple idea: to make ordering food easier
                and more enjoyable.
              </li>
              <br />
              <li>
                <span className="underline  text-white">
                  What Sets Us Apart
                </span>
                : Quality - We partner with top-rated restaurants to bring you
                the highest quality food. Variety - Our diverse menu offers
                something for everyone, from classic favorites to unique
                specialties.
              </li>
              <br />
              <li>
                <span className="font-bold  text-white">Join Us!</span> We
                invite you to join us on our culinary journey. Explore our app,
                discover new flavors, and experience the joy of good food with
                Food Express.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
