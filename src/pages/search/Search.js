import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Cards from "../../components/Card";

const Search = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("name");

  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        if (!searchQuery) {
          setMenuItems([]);
          return;
        }

        const response = await fetch(
          `http://localhost:3001/menu/search?name=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        if (data.results.length === 0) {
          setError(true);
          setMenuItems([]);
        } else {
          setError(false);
          setMenuItems(data.results);
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setError(true);
        setMenuItems([]);
      }
    };

    fetchMenuItems();
  }, [searchQuery]);

  useEffect(() => {
    if (error && searchQuery) {
      Swal.fire({
        title: `Your search item "${searchQuery}" not found!`,
        text: "Sorry not available!",
        icon: "info",
        confirmButtonText: "Back!",
      });
    }
    else{
      Swal.fire({
        title: `Wow item realted to "${searchQuery}" found.`,
        text: "Enjoy your meal",
        icon: "success",
        confirmButtonText: "Back!",
      });
    }
  }, [error, searchQuery]);

  useEffect(() => {
    // Reset error state when search query changes
    setError(false);
  }, [searchQuery]);

  return (
    <div className="lg:max-w-screen-2xl lg:container mx-auto xl:px-24 py-8 px-4 lg:px-30 lg:py-16 sm:section-container">
      {error ? (
        <div className="text-center">
          <p>No items found for your search query.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {menuItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
