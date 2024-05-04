import React from "react";

const Alert = ({ isLoggedIn, isRegistered }) => {
  const getMessage = () => {
    if (isLoggedIn) {
      return "Welcome back! You are logged in.";
    } else if (isRegistered) {
      return "You have successfully registered. Please log in.";
    } else {
      return "Logout successfully";
    }
  };

  return (
    <div className="alert">
      <span>{getMessage()}</span>
    </div>
  );
};

export default Alert;
