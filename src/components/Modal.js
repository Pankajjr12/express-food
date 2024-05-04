import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosGlobal";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, signUpWithGmail } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Error in login:", error);
        toast.error(
          "Account not found. Please check your email and password.",
          {
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
          }
        );
      });
  };
  
  const handleLogin = () => {
    signUpWithGmail()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
        document.getElementById("my_modal_5").close();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error in Google login:", error);
        // Handle Google login error
      });
  };
  

  return (
    <div>
      <ToastContainer position="bottom-center" />
      <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action flex flex-col justify-center mt-4">
            <form
              className="card-body"
              method="dialog"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="font-bold text-lg text-center">Please Login</h1>
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

              {errorMessage && (
                <p className="text-blue font-semibold text-xs">
                  {errorMessage}
                </p>
              )}

              <div className="form-control mt-6">
                <button type="submit" className="btn hover:bg-red">
                  Login
                </button>
              </div>
              <p className="mt-1 text-center underline-offset-8">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="hover:text-red font-bold ml-2"
                  onClick={() => document.getElementById("my_modal_5").close()}
                >
                  Register
                </Link>{" "}
              </p>
              <button
                htmlFor="my_modal_5"
                onClick={() => document.getElementById("my_modal_5").close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <div className="text-center m-2">
              <button
                className="btn font-bold btn-circle hover:bg-white m-2"
                onClick={handleLogin}
              >
                <FcGoogle />
              </button>
              <button className="btn font-bold btn-circle hover:bg-white m-2">
                <FaGithub />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
