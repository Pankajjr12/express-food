import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosGlobal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [user, setUser] = useState(null);

  const { signUpWithGmail, createUser, updateUserProfile } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        const userInfo = {
          // Define userInfo here
          name: data.name,
          email: data.email,
        };

        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            setUser({ ...user,displayName:data.name, photoURL: data.photoUrl });
            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                toast.success("Signin successful!");
                document.getElementById("my_modal_5").close();
                navigate(from, { replace: true });
              })
              .catch((error) => {
                // Handle axios post request error
                console.error("Error in axios post request:", error);
              });
          })
          .catch((error) => {
            // Handle updateUserProfile error
            console.error("Error in updateUserProfile:", error);
          });
      })
      .catch((error) => {
        // Handle createUser error
        toast.error("Email already in use", {
          style: {
            background: "maroon",
            color: "white",
            borderRadius: "10px",
            margin: "0 auto",
            maxWidth: "400px",
          },
          iconTheme: {
            primary: "white",
            secondary: "red",
          },
        });

      });
   
  };

  // signup with google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          // Define userInfo here
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          toast.success("Signin successful!");
          document.getElementById("my_modal_5").close();
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <ToastContainer />
      <div className="max-w-md modal-box shadow w-full mx-auto text-center flex justify-center my-20 rounded-2xl">
        <div className="modal-action flex flex-col justify-center  mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-bold text-lg text-center">
              Create an account{" "}
            </h1>

            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="name"
                placeholder="Your name"
                className="input input-bordered"
                {...register("name")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* errors */}

            {/* sign btn */}
            <div className="form-control mt-6">
              <input type="submit" value="Signup" className="btn bg-blue" />
            </div>

            <p className="text-center my-2">
              Already have an account?
              <button
                htmlFor="my_modal_5"
                className="hover:text-red font-bold ml-2"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Login!
              </button>{" "}
            </p>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
          </form>
          {/* social sign in */}
          <div className="text-center">
            <button
              onClick={handleRegister}
              className="btn btn-circle hover:bg-blue hover:text-white  m-4"
            >
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-blue hover:text-white  m-4">
              <FaGithub />
            </button>
          </div>
        </div>

        <Modal />
      </div>
    </>
  );
};

export default SignUp;
