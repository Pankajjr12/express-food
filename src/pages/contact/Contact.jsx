import React, { useContext, useEffect, useState } from "react";
import logo from "../../anim/phone.png";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";



const Contact = () => {


  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [loggedInUserEmail, setLoggedInUserEmail] = useState(""); // State to store the logged-in user's email

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const loggedInUserEmail = decodedToken.email;
      setLoggedInUserEmail(loggedInUserEmail); // Update the state with the logged-in user's email
    }
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    about: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access-token");
      const formDataWithUserEmail = {
        ...formData,
        loggedInUserEmail: loggedInUserEmail,
      };

      // Check if the form email matches the logged-in user's email
      if (formData.email === loggedInUserEmail) {
        const response = await axios.post(
          "https://express-food-server.onrender.com//users/send-email",
          formDataWithUserEmail,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          width: 600,
          icon: "success",
          title: "Email sent successfully",
          showConfirmButton: false,
          timer: 1500,
          padding: "3em",
          color: "#716add",
        });
      } else {
        Swal.fire({
          width: 600,
          icon: "error",
          title: "Unauthorized",
          text: "You are not authorized to send an email on behalf of another user.",
          showConfirmButton: false,
          timer: 1500,
          padding: "3em",
          color: "#800000",
        });
      }
    } catch (error) {
      Swal.fire({
        width: 600,
        icon: "error",
        title: "Failed to send email",
        text: "Please try again later.",
        showConfirmButton: false,
        timer: 1500,
        padding: "3em",
        color: "#800000",
      });
    }
  };

  // const handleCancel = (event) => {
  //   event.preventDefault();
  //   setFormData({ username: "", email: "", about: "" });
  // };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <div className="section-container  my-5 md:flex md:items-center md:flex-col md:justify-center ">
        <div className="flex  items-center justify-center space-x-3 pb-6 bg-white p-4 rounded-md">
          <img src={logo} alt="logo" className="sm:w-30 sm:h-30 w-10 h-10" />
          <p className="font-bold text-lg text-center">Contact Us</p>
        </div>
        <div className="md:border md:rounded-md md:p-10 space-y-5">
          <div className="flex flex-col mt-10 ">
            <label
              htmlFor="username"
              className={`block text-sm leading-6  ${
                formData.username ? "font-bold  text-gray-200" : "text-gray-500"
              }`}
            >
               Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-maroon sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter username.."
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className={`block text-sm leading-6 ${
                formData.email ? "font-bold text-gray-200" : "text-gray-500"
              }`}
            >
              Email
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-maroon sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter email.."
                />
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className={`block text-sm leading-6  ${
                formData.about ? "font-bold text-gray-200" : "text-gray-500"
              }`}
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block  rounded-md border-0 py-1.5 pl-1 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
                value={formData.about}
                onChange={handleChange}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Write a few sentences about your query.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold rounded-md text-gray-900 bg-white px-3 py-2"
              // onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Contact;
