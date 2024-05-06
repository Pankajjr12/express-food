import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import emtyCart from "../../anim/cartEmpty.gif";
const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`https://express-food-server.onrender.com//carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    // console.log(item._id);
    if (item.quantity > 1) {
      const response = await fetch(`https://express-food-server.onrender.com//carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      });
      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      }
      refetch();
    } else {
      alert("item cannot be zero");
    }
    refetch();
  };

  const HorizontalDivider = () => {
    return <hr className="border-t border-gray-800 my-4 md:hidden" />;
  };
  const handleDelete = (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2", // Add ml-2 class for left padding
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://express-food-server.onrender.com//carts/${item._id}`)
            .then((response) => {
              if (response) {
                refetch();
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your cart is safe :)",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const cartSubTotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + calculatePrice(item), 0)
    : 0;

  const orderTotal = cartSubTotal;

  return (
    <div className="lg:max-w-screen-2xl lg:conatiner mx-auto xl:px-24 lg:px-30 lg:py-16 sm:section-container">
      <div className="gradient bg-background bg-cover bg-center lg:bg-web-image space-y-5 py-24 flex flex-col justify-center items-center gap-8">
        <div className="space-y-8 px-2">
          <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-sung">
            Items Added to the{" "}
            <span className="text-blue text-animation"> Food</span> ever
          </h2>
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-red text-white font-semibold">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="bg-[#082f49]">
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="no image found" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium truncate">{item.name}</td>
                  <td>
                    <div className="flex flex-row h-5 w-full rounded-lg relative bg-transparent mt-1">
                      <button
                        data-action="decrement"
                        className="bg-red h-full w-5 md:w-10 rounded-l cursor-pointer outline-none flex items-center justify-center"
                        onClick={() => handleDecrease(item)}
                      >
                        <span className="text-xl font-thin">−</span>
                      </button>
                      <input
                        type="number"
                        className="focus:outline-none text-center w-4 md:w-8 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none"
                        name="custom-input-number"
                        onChange={() => console.log(item.quantity)}
                        value={item.quantity}
                      />
                      <button
                        data-action="increment"
                        className="bg-red h-full w-5 md:w-10 rounded-r cursor-pointer flex items-center justify-center"
                        onClick={() => handleIncrease(item)}
                      >
                        <span className="text-xl font-thin">+</span>
                      </button>
                    </div>
                  </td>
                  <td>{calculatePrice(item).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-ghost btn-xs hover:text-white hover:bg-maroon"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : (
        <div className="text-center mt-20 flex space-y-4 lg:text-4xl items-center flex-col text-white font-semibold">
          <p>Cart is empty. Please add products.</p>

          <svg
            className="h-8 w-8 text-white hover:text-orange-400 animate-ping"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="9" cy="19" r="2" /> <circle cx="17" cy="19" r="2" />{" "}
            <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" />
          </svg>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}

      <div className="my-12 flex flex-col md:flex-row xl:px-24 py-10 px-4 justify-between items-start">
        <div className="md:w-1/2 space-y-3 md:mr-5">
          <h3 className="font-bold text-white">Details of Buyer</h3>
          <p>Name : {user.displayName}</p>
          <p>Email : {user.email}</p>
          <p>User Id : {user.uid}</p>
        </div>
        <hr className="border-t border-gray-800 my-4 md:hidden" />
        <div className="md:w-1/2 space-y-3 mt-4 md:mt-0">
          <h3 className="font-bold text-white">Shopping Details</h3>
          <p>
            Total Items :<span className="text-white"> {cart.length}</span>
          </p>
          <p>
            Total Price :
            <span className="text-white"> {orderTotal.toFixed(2)} Rs</span>
          </p>
        </div>
        <hr className="border-t border-gray-800 my-4 md:hidden" />
        <div className="md:w-1/2 space-y-3 mt-4 md:mt-0">
          <Link to="/process-checkout">
            <button className="btn bg-red text-white font-semibold">
              Proceed To CheckOut
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
