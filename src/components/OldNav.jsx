import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import useCart from "../hooks/useCart";
import Dancing from "./Dancing";
import useAuth from "../hooks/useAuth";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleItemClick = () => {
    // Close the dropdown when an item is clicked
    closeDropdown();
  };

  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useAuth();
  const [cart, refetch] = useCart();
  console.log(cart);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  const navItem = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className="font-semibold">Menu</summary>
          <ul className="p-2">
            <li>
              <Link to="/menu">All</Link>
            </li>
            <li>
              <Link to="">Pizza</Link>
            </li>
            <li>
              <Link to="">Burger</Link>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={1}>
        <details>
          <summary className="font-semibold">Services</summary>
          <ul className="p-2 w-40">
            <li>
              <Link to="">Online order</Link>
            </li>
            <li>
              <Link to="">Dine in</Link>
            </li>
            <li>
              <Link to="">Order tracking</Link>
            </li>
          </ul>
        </details>
      </li>
      <li className="font-semibold">
        <Link>Offers</Link>
      </li>
    </>
  );
  return (
    <header className="container max-w-screen-2xl mx-auto fixed top-0 right-0 left-0 ">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-red transition-all duration-300 ease-in-out "
            : " "
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={toggleDropdown}
            >
              {/* Use conditional rendering to change the chevron direction */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link to="/" onClick={handleItemClick}>
                  Item m
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleItemClick}>
                  Parent
                </Link>
                <ul className="p-2">
                  <li>
                    <Link to="/" onClick={handleItemClick}>
                      Submenu 1
                    </Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleItemClick}>
                      Submenu 2
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/" onClick={handleItemClick}>
                  Item 3
                </Link>
              </li>
            </ul>
          </div>
          <Link className="btn btn-ghost md:text-xl">
            <IoFastFood
              size={25}
              className="text-white animate-bounce hover:animate-none"
            />
            <span className="text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              Food Express
            </span>
          </Link>
        </div>
        <div className="navbar-start hidden lg:flex focus:hidden">
          <ul className="menu menu-horizontal px-1 text-xl">{navItem}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* shopping cart */}

          <div className="flex items-center relative">
            {user ? (<Link to="/cart-page">
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
            </Link>):" "}

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
                className="btn bg-red rounded-[18px] md:w-15 px-2 py-2 lg:px-4 text-white flex space-x-2"
              >
                <FaRegUser /> Login
              </button>
            )}
            <Modal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
