import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthProvider";
import useAuth from "../hooks/useAuth";

const Profile = ({ user }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  
  // State to track whether drawer is open or closed
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Close drawer function
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Open drawer function
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex justify-end drawer drawer-end z-10">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn-ghost rounded-full avatar hover:border-1  hover:border-black "
          onClick={openDrawer}
        >
          <div className="w-10 rounded-full ">
            {user.photoURL ? (
              <img alt="no" src={user.photoURL} />
            ) : (
              <img
                alt="no"
                src="https://randomuser.me/api/portraits/lego/5.jpg"
              />
            )}
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {isDrawerOpen && (
          <button
            onClick={closeDrawer}
            className="absolute top-1 right-4 p-2 text-xl cursor-pointer z-20"
          >
            X
          </button>
        )}
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="mt-5">
            <Link to="/update-profile">Profile</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
