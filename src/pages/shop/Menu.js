import React, { useEffect, useState } from "react";
import Cards from "../../components/Card";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://express-food-server.onrender.com/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optionally, you can make the scroll behavior smooth
    });
  };

  // filtering data based on the category
  const filterItem = (category) => {
    console.log("Filtering category:", category);
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    console.log("Filtered items:", filtered);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show data function
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    console.log("Sorting option:", option);
    setSortOption(option);
    let sortedItems = [...filteredItems];

    // logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Low-to-high":
        sortedItems.sort((a, b) => {
          console.log("Comparing prices:", a.price, b.price);
          return a.price - b.price;
        });
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => {
          console.log("Comparing prices:", a.price, b.price);
          return b.price - a.price;
        });
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* menu banner */}
      <div className="section-container gradient bg-background bg-cover bg-center lg:bg-web-image space-y-5">
        <div className="py-24 flex flex-col md:flex-row justify-between items-center gap-8 ">
          {/* texts stuff */}
          <div className=" text-center space-y-8 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-sung ">
              Get the tastiest and freshest{" "}
              <span className="text-blue"> Food</span> ever
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Where each bite gives the taste of Indian spices
            </p>
            <Link to="/cart-page">
              <button className="btn bg-blue px-8 py-4 font-semibold text-white rounded-full">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container ">
        {/* filtering section */}
        <div className="flex flex-col justify-between items-center space-y-3 mb-6">
          {/* buttons container */}
          <div className="mt-2 overflow-x-auto max-w-full px-2 py-1 rounded-full bg-white">
            {/* buttons for all categories */}
            <div className="flex justify-start md:items-center md:gap-8 gap-4 flex-nowrap ">
              <button
                onClick={showAll}
                className={
                  selectedCategory === "all"
                    ? " rounded-l-full px-4 py-2  bg-red font-bold"
                    : ""
                }
              >
                All
              </button>

              <button
                onClick={() => {
                  console.log("Clicked Thali button");
                  filterItem("thalis");
                }}
                className={
                  selectedCategory === "thalis"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Thali
              </button>
              <button
                onClick={() => filterItem("snacks")}
                className={
                  selectedCategory === "snacks"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Snacks
              </button>
              <button
                onClick={() => filterItem("sandwich")}
                className={
                  selectedCategory === "sandwich"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Sandwich
              </button>
              <button
                onClick={() => filterItem("pizza")}
                className={
                  selectedCategory === "pizza"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Pizza
              </button>
              <button
                onClick={() => filterItem("fast")}
                className={
                  selectedCategory === "fast"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Fast
              </button>
              <button
                onClick={() => filterItem("burgers")}
                className={
                  selectedCategory === "burgers"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Burger
              </button>
              <button
                onClick={() => filterItem("desserts")}
                className={
                  selectedCategory === "desserts"
                    ? " rounded-xl px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Desserts
              </button>
              <button
                onClick={() => filterItem("sweets")}
                className={
                  selectedCategory === "sweets" ? (
                    " rounded-xl px-2 py-2 bg-red  font-bold"
                  ) : (
                    <p>Nothing in Menu</p>
                  )
                }
              >
                Sweets
              </button>
              <button
                onClick={() => filterItem("drinks")}
                className={
                  selectedCategory === "drinks"
                    ? " rounded-r-full px-2 py-2 bg-red  font-bold"
                    : ""
                }
              >
                Drinks
              </button>
            </div>
          </div>

          {/* sorting ... */}
          <div className="flex p-2 justify-end mb-4 rounded-sm">
            <FaFilter className="h-4 w-4 text-white" />
          </div>
          <select
            name="sort"
            id="sort"
            className="rounded-md text-white bg-gray-600 p-1"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Low-to-high">low to high</option>
            <option value="high-to-low">high to low</option>
          </select>
        </div>

        {/* products card */}

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination  */}
      <div className="flex flex-wrap justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => {
              paginate(index + 1);
              scrollToTop(); // Call scrollToTop function when button is clicked
            }}
            className={`mx-2 my-1 px-2 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-maroon text-white font-bold"
                : "bg-gray-200 text-gray-700"
            } ${index + 1 < 10 ? "px-3" : "px-2"} `}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
