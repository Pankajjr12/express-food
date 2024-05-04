import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user } = useContext(AuthContext)
  console.log(user?.email);
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  console.log(orders);
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };
  return (
    <div className="lg:max-w-screen-2xl lg:conatiner mx-auto xl:px-24 lg:px-30 lg:py-16 sm:section-container">
      <div className="gradient bg-background bg-cover bg-center lg:bg-web-image space-y-5 py-24 flex flex-col justify-center items-center gap-8">
        <div className="space-y-8 px-2">
          <h2 className="md:text-5xl text-3xl font-bold md:leading-snug leading-sung">
            Track all your{" "}
            <span className=" text-animation">Order</span> here
          </h2>
        </div>
      </div>

      {/* table */}
      <div>
        {orders.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table border-collapse">
                  {/* head */}
                  <thead className="bg-red text-white font-semibold">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>transitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#082f49]">
                    {orders.map((item, index) => (
                      <tr key={index} className="hover:shadow-lg text-blue-500">
                        <td>{index + 1}</td>

                        <td className="font-medium">
                          {formatDate(item.createdAt)}
                        </td>
                        <td>{item.transitionId}</td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                        {/* <td>${calculateTotalPrice(item).toFixed(2)}</td> */}
                        <td>
                          <Link
                            to="/contact"
                            className="btn btn-sm border-none text-red bg-transparent"
                          >
                            <FaPhoneSquareAlt style={{color:"white"}} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName || "None"}</p>
                <p>Email: {user?.email}</p>
                <p>
                  User_id: <span className="text-sm">{user?.uid}</span>
                </p>
              </div>
              
            </div>
          </div>
        ) : (
          ""
          // <div className="text-center mt-20">
          //   <p>Cart is empty. Please add products.</p>
          //   <Link to="/menu">
          //     <button className="btn bg-green text-white mt-3">
          //       Back to Menu
          //     </button>
          //   </Link>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Order;
