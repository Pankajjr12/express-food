import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaThumbsUp } from "react-icons/fa"; // Import icons

const SingleProductPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState({});

  const starPercentage = (menu.starRatings / 5) * 100;

  // Round to nearest 10
  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  // Define star styles
  const starStyles = {
    width: starPercentageRounded,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://express-food-server.onrender.com/menu/${id}`);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // Ensure that the current slide is always centered
  };

  return (
    <div className="flex md:justify-center md:items-center h-screen mt-5 md:-mt-10">
      <div className="section-container flex flex-col sm:flex-row h-auto gap-4 relative">
        <div className="w-full sm:w-1/2 relative">
          {/* Blur effect overlay */}
          <div className="absolute inset-0 bg-black opacity-25 rounded-lg mt-0 md:-my-5"></div>
          <Slider {...settings}>
            {menu?.backdropImages &&
              menu.backdropImages.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg w-full overflow-hidden "
                >
                  <img
                    src={image}
                    alt={`Backdrop ${index}`}
                    className="w-full h-full sm:h-80 object-cover sm:object-contain"
                    style={{
                      maxHeight: "180px", // Height for small devices
                    }}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = "/images/nofood.png'"; // Replace with your default image URL
                    }}
                  />
                </div>
              ))}
          </Slider>
        </div>
        <div className="w-full sm:w-1/2 max-h-screen overflow-y-auto mt-5 ">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold mt-2 md:text-3xl">{menu?.name}</h2>
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {menu?.category &&
                menu.category.charAt(0).toUpperCase() + menu?.category.slice(1)}
            </span>
          </div>

          <div className="bg-white text-sm md:text-lg rounded-lg mt-5 p-4">
            <p className="text-md lg:text-lg text-justify text-wrap">
              &emsp;
              {menu?.description}
            </p>
            <div className="flex items-center mt-3">
              <FaThumbsUp className="text-green-500 mr-2" />
              <p className="text-xl font-bold mr-4">{menu?.likes}</p>
              <FaStar className="text-yellow-500 mr-2" />
              <p className="text-xl font-bold">{menu?.starRatings}</p>
            </div>
          </div>
        </div>

        <Link to="/menu">
          <button className="btn md:hidden btn-active btn-accent hover:text-white">
            Back to Menu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProductPage;
