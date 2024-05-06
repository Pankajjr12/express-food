import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";
import axios from "axios";
import useAxiosSecurity from "../hooks/useAxiosSecurity";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  // Use the useAxiosSecurity hook to get the configured Axios instance
  const axiosSecure = useAxiosSecurity();

  const handleHeartClick = () => {
    const menuId = item._id;
    if (isHeartFilled) {
      setIsHeartFilled(false);
      axiosSecure
        .patch(`/menu/${menuId}/dislike`)
        .then((response) => {
          console.log("Disliked successfully");
        })
        .catch((error) => {
          console.error("Error disliking item:", error);
        });
    } else {
      setIsHeartFilled(true);
      setHeartCount(heartCount + 1);
      axiosSecure
        .patch(`/menu/${menuId}/like`)
        .then((response) => {
          console.log("Liked successfully");
        })
        .catch((error) => {
          setHeartCount(heartCount);
          setIsHeartFilled(!isHeartFilled);
          console.error("Error liking item:", error);
        });
    }
  };

  // add to cart handler
  const handleAddToCart = (item) => {
    // console.log(item);
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      axios
        .post("https://express-food-server.onrender.com//carts", cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              width: 600,
              icon: "success",
              title: "Item added to the cart",
              showConfirmButton: false,
              timer: 1500,
              padding: "3em",
              color: "#716add",
              backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "please SignUp or Login",
        text: "You won't be able to add items to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SignUp or LoginUp",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card bg-slate-800 shadow-xl relative px-2 md:my-5">
      <div
        className={`rating gap-1 absolute md:-right-2 -right-1 p-1 md:-top-4 md:p-2 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-6 h-6 cursor-pointer" />
      </div>
      <Link>
        <figure>
          <img
            src={item.image}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:w-66 h-66"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link
          to={{
            pathname: `/product-page/${item._id}`,
            state: { menuItem: item }, // Pass the entire menu item as state
          }}
        >
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p className="line-clamp-2">{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-white">Rs </span> {item.price}
          </h5>
          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-green text-white hover:bg-red"
          >
            Add to Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
