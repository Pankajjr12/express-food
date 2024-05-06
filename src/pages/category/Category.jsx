import React, { useState, useEffect } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const [gradient, setGradient] = useState(
    'linear-gradient(132deg, rgb(6, 33, 59) 0.00%, rgb(5, 41, 80) 100.00%)'
  );

  useEffect(() => {
    const gradients = [
      "linear-gradient(132deg, rgb(6, 33, 59) 0.00%, rgb(5, 41, 80) 100.00%)",
      "linear-gradient(132deg, rgb(158, 10, 52)0.00%, rgb(86, 2, 2) 100.00%)",
      "linear-gradient(132deg, rgb(154, 44, 110)0.00%, rgb(66, 2, 53)) 100.00%)",
    ];
    let index = 0;

    const interval = setInterval(() => {
      setGradient(gradients[index]);
      index = (index + 1) % gradients.length;
    }, 3000); // Change gradient every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);
  useEffect(() => {
    fetch("https://express-food-server.onrender.com/menu")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API response is an array of category objects
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Filter categories to include only fast food, thalis, pizza, and sweets
  const filteredCategories = categories.reduce((acc, category) => {
    const existingCategory = acc.find((c) => c.category === category.category);
    if (!existingCategory) {
      acc.push({ category: category.category, dishes: [category] });
    } else {
      existingCategory.dishes.push(category);
    }
    return acc;
  }, []);

  return (
    <div className="section-container py-8 relative">
      <div className="mt-2 lg:mt-4">
        <p className="subtitle">What's on your mind?</p>
        <h2 className="headtxt">Popular Categories</h2>
      </div>
      {/* categories cards */}
      <div className="grid grid-cols-2  md:grid-cols-4 gap-5 justify-around sm:items-center mt-12">
        {filteredCategories.map((category) => (
          <div
            key={category.category}
            style={{ background: gradient }}
            className="shadow-lg rounded-md w-full mx-15 overflow-hidden bg-white py-3 px-3 md:py-6 md:px-6 mx-auto text-center cursor-pointer hover:-translate-y-3 duration-300 transitopn-all"
          >
            <div className="flex w-full mx-auto md:items-center justify-center">
              {/* Render image */}
            </div>
            <div className="mt-5 space-y-1 text-gray-400">
              <h5
                style={{
                  textShadow:
                    "-1px -1px 0 #000, 1px -1px 0 #0e0e0e, -1px 1px 0 #252525, 1px 1px 0 #000",
                }}
                className="font-semibold"
              >
                {category.category.charAt(0).toUpperCase() +
                  category.category.slice(1)}{" "}

                 <br />
                ({category.dishes.length} dishes)
              </h5>
              {/* Render other details if needed */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
