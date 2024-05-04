import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

import useAxiosSecurity from "../../../hooks/useAxiosSecurity";
import { AuthContext } from "../../../contexts/AuthProvider";

const Users = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecurity()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
      return res.data;
    },
    staleTime:0
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.displayName} is now Admin`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      alert(`${user.displayName} is now Deleted`);
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-5">
        <h5>All Users</h5>
        <h5>Total Users : {users.length}</h5>
      </div>

      {/* {table} */}
      <div className="overflow-x-auto">
        <table className="table table-zebra md:w-[850px]">
          {/* head */}
          <thead className="bg-maroon text-white font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) ? (
              users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="flex items-center justify-start">
                    <img
                      src={user.photoUrl ||user.photoURL}
                      className="rounded-full w-9 h-9 object-cover mr-2"
                      alt={user.username}
                    />
                    <span className="ml-2">{user.displayName || user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button  onClick={() => handleMakeAdmin(user)} className="bg-gray-600 p-2 rounded-full items-center justify-between hover:bg-maroon text-white">
                        <FaRegUser />
                      </button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-xs hover:text-white hover:bg-maroon">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div class="flex justify-center items-center min-h-screen">
                <p class="text-center text-3xl">
                  Only Admin has Access for this
                </p>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
