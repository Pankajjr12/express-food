import React, { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  MenuIcon as Bars3Icon,
  XIcon as XMarkIcon,
} from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";

import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";

const navigation = [
  { name: "Home", href: "/", current: true },
  {
    name: "Menu",
    href: "/menu",
    current: false,
    submenu: [
      { name: "All", href: "/menu" },
      { name: "Pizza", href: "#" },
      { name: "Burger", href: "#" },
    ],
  },
  {
    name: "Services",
    href: "#",
    current: false,
    submenu: [
      { name: "Online order", href: "#" },
      { name: "Dine in", href: "#" },
      { name: "Order tracking", href: "#" },
    ],
  },
  { name: "Offers", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ onSearch }) => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useAuth();
  const [cart, refetch] = useCart(!user);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState(null); // State to track open submenu

  const submenuRef = useRef(null);

  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      setIsNavOpen(false);
      // Perform search logic here, such as fetching data from backend
      console.log("Performing search with query:", query);
      navigate(`/search?name=${query}`); // Remove '=' after '?'
    } else {
      console.log("Please enter a search query.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents form submission
      handleSearch(); // Calls handleSearch function to perform search
    }
  };

  const handleMenuClick = (index) => {
    setOpenMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle submenu open/close
  };

  const handleSubmenuClick = (event) => {
    event.stopPropagation(); // Prevent click event from bubbling up
    console.log("Submenu item clicked");
    setOpenMenu((prevIndex) => prevIndex); // Keep the submenu open
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setOpenMenu(null); // Close the submenu if clicked outside
      }
    }

    // Check screen size
    const isLargeScreen = window.matchMedia("(min-width: 768px)").matches;
    if (isLargeScreen) {
      // Add event listener only on large screens
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      if (isLargeScreen) {
        // Remove event listener only on large screens
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 40) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <Disclosure
      as="nav"
      className={
        isSticky ? "sticky top-0  bg-red shadow-md" : "bg-gray-800"
      }
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setIsNavOpen(!isNavOpen)}
                >
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex  items-center justify-center h-full">
                <Link className="btn btn-ghost items-center md:text-xl">
                  <IoFastFood
                    size={20}
                    className="text-white ml-10 md:ml-0 animate-bounce hover:animate-none"
                  />
                  <span className="text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                    Food Express
                  </span>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex gap-x-4 ">
                    {navigation.map((item, index) => (
                      <div key={item.name} className="relative">
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => handleMenuClick(index)} // Handle menu click
                        >
                          {item.name}
                        </a>
                        {openMenu === index &&
                          item.submenu && ( // Check if submenu should be open
                            <div
                              className="absolute z-10 left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden"
                              ref={submenuRef}
                            >
                              {item.submenu.map((subitem) => (
                                <a
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {subitem.name}
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div class="relative hidden sm:flex rounded-2xl bg-transparent py-1 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10">
                <div class="mx-auto max-w-md">
                  <form action="" class="relative mx-auto w-max">
                    <input
                      type="search"
                      value={query}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="peer relative z-10 h-8 w-8 cursor-pointer rounded-full border bg-transparent pr-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </div>
              </div>

              <div className="flex items-center relative">
                {user ? (
                  <Link to="/cart-page">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle  lg:flex items-center justify-center mr-3"
                    >
                      <div className="indicator">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="badge badge-sm indicator-item">
                          {cart.length || 0}
                        </span>
                      </div>
                    </label>
                  </Link>
                ) : (
                  ""
                )}

                {/* {  login btn  } */}

                {user ? (
                  <>
                    <Profile user={user} />
                  </>
                ) : (
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                    className="btn bg-red rounded-[18px] md:w-15 px-2 my-2 py-2 lg:px-4 text-white flex space-x-2"
                  >
                    <FaRegUser /> Login
                  </button>
                )}
                <Modal />
              </div>

              {/* Profile dropdown */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden" open={isNavOpen}>
            <div className="space-y-1 px-2 pb-3 pt-2">
              {" "}
              {/* Add onSubmit handler */}
              <div className="form-control pb-2 flex flex-row justify-between">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  r
                  className="input input-bordered flex-grow mr-2 w-24" // Added 'mr-2' for spacing between input and button
                />
                <button
                  type="submit"
                  className="btn text-white"
                  onClick={handleSearch}
                >
                  Search
                </button>{" "}
                {/* Add type and button element */}
              </div>
              {navigation.map((item, index) => (
                <div key={item.name}>
                  <Disclosure.Button
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      " rounded-md px-3 py-2 text-base font-medium flex justify-between items-center"
                    )}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => handleMenuClick(index)} // Handle main menu click
                  >
                    <span>{item.name}</span>
                    {item.submenu && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            openMenu === index
                              ? "M19 9l-7 7-7-7"
                              : "M9 5l7 7 7-7"
                          }
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                  {openMenu === index &&
                    item.submenu && ( // Check if submenu should be open
                      <div className="space-y-1" ref={submenuRef}>
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-3 py-2 text-base text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click event from bubbling up
                              handleSubmenuClick(e); // Handle submenu click
                            }}
                          >
                            {subitem.name}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
