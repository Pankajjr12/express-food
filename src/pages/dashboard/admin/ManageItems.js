import React, { useState, useEffect } from "react";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecurity from "../../../hooks/useAxiosSecurity";

const ManageItems = () => {
  const axiosSecure = useAxiosSecurity();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page
  const [menu, loading, refetch] = useMenu();

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset current page when menu changes
  }, [menu]);

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Attempt to delete the menu item using axiosSecure
          const res = await axiosSecure.delete(`/menu/${item._id}`);
          console.log(res);
          if (res) {
            // If successful, refetch the menu items and show a success message
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          // If an error occurs, show an error message
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the item.",
            icon: "error",
          });
          console.error("Error deleting item:", error);
        }
      }
    });
  };

  return (
    <div className="w-full md:w-[870px] mx-auto mb-3">
      <p className="text-xl font-semibold my-2">
        <span className="headtxt">&nbsp;Manage</span> Menu Items
      </p>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          <thead className="bg-maroon text-white font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr className="px-4 py-2" key={index}>
                <td>{String(indexOfFirstItem + index + 1).padStart(2, "0")}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="truncate px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button className="btn btn-ghost btn-xs hover:text-white hover:bg-black">
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="btn btn-ghost btn-xs hover:text-white hover:bg-maroon"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 space-y-3">
        <ul className="pagination flex justify-between">
          {menu.length > itemsPerPage &&
            Array.from({ length: Math.ceil(menu.length / itemsPerPage) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {/* <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`btn btn-square ${
                      currentPage === index + 1 ? "" : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button> */}
                </li>
              )
            )}
        </ul>
      </div>

      <div className="join grid grid-cols-2 justify-center max-w-sm mt-8">
        <button
          className="join-item btn  bg-white outline-none hover:outline-none hover:bg-maroon hover:text-white"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn  bg-white hover:bg-maroon hover:text-white"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(menu.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageItems;
