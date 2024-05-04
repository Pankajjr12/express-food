import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosGlobal from "../../../hooks/useAxiosGlobal";
import useAxiosSecurity from "../../../hooks/useAxiosSecurity";
import { useForm } from "react-hook-form";

const UpdateMenu = () => {
  const item = useLoaderData();

  const { register, handleSubmit, reset } = useForm();
  const image_hosting_key = process.env.REACT_APP_IMAGE_HOSTING_API_KEY;
  // console.log(image_hosting_key);

  const navigate = useNavigate();
  const axiosPublic = useAxiosGlobal();
  const axiosSecure = useAxiosSecurity();

  const image_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${image_hosting_key}`;
  const onSubmit = async (data) => {
    // console.log(data);
    const imageFile = {
      image: data.image[0],
    };
    const hostingImg = await axiosPublic.post(image_hosting_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg);
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };
      // console.log(menuItem)

      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your item updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] mx-auto mb-3">
      <p className="text-4xl font-semibold my-2">
        <span className="headtxt">Update</span>&nbsp;Menu Item
      </p>

      {/* { form } */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
               
                <option value="burgers">Burgers</option>
                <option value="sandwich">Sandwich</option>
                <option value="thalis">Thali</option>
                <option value="sweets">Sweets</option>
                <option value="drinks">Drinks</option>
                <option value="pizza">Pizza</option>
                <option value="fast">Fast</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={item.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn outline-none border-none btn-primary hover:translate-x-1 hover:bg-red hover:text-white hover:outline-none">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
