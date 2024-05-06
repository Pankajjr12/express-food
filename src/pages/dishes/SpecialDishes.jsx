import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "../../components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Cards from "../../components/Card";

const SpecialDishes = () => {
  const [recipies, setRecipies] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const slider = React.useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://express-food-server.onrender.com//menu");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        const specials = data.filter((item) => item.category === "fast");
        setRecipies(specials);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };
  
    fetchData(); // Call fetchData function when the component mounts
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />,
  };

  return (
    <div className="section-container py-8 relative">
      <div className="mt-5">
        <h2 className="subtitle  ">
          Our weekly special dishes will steal your heart!
        </h2>
        <p className="headtxt ">Special Dishes</p>
      </div>
      <div
        className="lg:absolute lg:right-3 md:top-16 mt-5 -ml-8 mb-5 
        flex md:block  px-4 sm:px-6"
      >
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn rounded-full ml-5 bg-red"
        >
          Back
          <FaAngleLeft className="w-5 h-5 p-1 " />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className="btn rounded-full ml-5 bg-red"
        >
          Next
          <FaAngleRight className="w-5 h-5 p-1 " />
        </button>
      </div>

      <Slider
        {...settings}
        ref={slider}
        className="overflow-hidden space-x-1 sm:space-x-3 mt-8 md:space-x-6"
      >
        {recipies.map((item) => (
          <div className="px-4">
          <Cards key={item._id} item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
