import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdOutlineManageHistory } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaSitemap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaDashcube } from "react-icons/fa";
import { TbReorder } from "react-icons/tb";
import { RiLogoutCircleRFill } from "react-icons/ri";
import Dancing from "../components/Dancing";
import Modal from "../components/Modal";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const sharedLinks = (
    <>
      <li className="mt-3">
        <Link to="/" className="mt-3">
          <MdDashboard className="text-maroon" size={22} />
          <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
            Home
          </span>
        </Link>
      </li>
      <li>
        <Link to="/menu" className="mt-3">
          <BiSolidFoodMenu className="text-maroon" size={22} />
          <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
            Menu
          </span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard/users" className="mt-3">
          <TbReorder className="text-maroon" size={22} />
          <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
            Order Tracking
          </span>
        </Link>
      </li>
    </>
  );
  return (
    <div className="sticky top-0">
      {isAdmin ? (
        <div className="sticky top-0  drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
            {/* Page content here */}
            <div className="flex flex-col items-center sm:items-center sm:justify-between gap-2 ">
              <label
                htmlFor="my-drawer-2"
                className="btn drawer-button lg:hidden bg-none"
              >
                <button className="btn rounded-full  px-6 bg-maroon text-white">
                  <FaDashcube />
                </button>
              </label>
              <button className="btn rounded-full lg:hidden px-6 bg-maroon text-white">
                <RiLogoutCircleRFill />
                Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard">
                  <IoFastFood
                    size={25}
                    className="text-white animate-bounce hover:animate-none"
                  />
                  <span className="font-extrabold">Food Express</span>
                  <Dancing text="Admin" />
                </Link>
              </li>
              <hr className="my-3 border-t-2 border-gray-500" />

              <li>
                <Link to="/dashboard" className="mt-3">
                  <MdDashboard className="text-maroon" size={22} />
                  <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
                    Dashboard
                  </span>
                </Link>
              </li>

              <li>
                <Link to="/dashboard/manage-bookings">
                  <MdOutlineManageHistory className="text-maroon" size={22} />
                  <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
                    Manage bookings
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  <FaSitemap className="text-maroon" size={22} />
                  <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
                    Manage items
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  <BiSolidFoodMenu className="text-maroon" size={22} />
                  <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
                    Add menu
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUser className="text-maroon" size={22} />
                  <span className="font-semibold ml-2 text-gray-400 shadow-md transform transition-transform hover:scale-105 hover:text-white">
                    All users
                  </span>
                </Link>
              </li>
              <hr className="my-3 border-t-2 border-gray-500" />

              {/* {shared links} */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) :  (
        <div className="min-h-screen flex items-center flex-col align-middle justify-center">
          <button
            htmlFor="my_modal_5"
            className="font-bold ml-2 text-white text-sm lg:text-2xl"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Only Admin has access to{" "}<span className="animate-ping  font-extrabold">dashboard!</span>
          </button>{" "}

          <div className="flex justify-center items-center">
          <Link to="/">
            <button className="btn bg-green text-white">Back to Home</button>
          </Link>
        </div>
          <Modal />
        </div>
      ) }
    </div>
  );
};

export default DashboardLayout;
