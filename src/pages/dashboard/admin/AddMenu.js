import React from "react";
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import useAxiosGlobal from "../../../hooks/useAxiosGlobal";
import useAxiosSecurity from "../../../hooks/useAxiosSecurity";
const AddMenu = () => {

  const { register, handleSubmit,reset } = useForm();
  const image_hosting_key =
    process.env.REACT_APP_IMAGE_HOSTING_API_KEY || "fallback_value";
  // console.log(image_hosting_key);

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

      const postMenuItem = axiosSecure.post("/menu", menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your item has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      
    }
  };
}

  return (
    <div className="w-full md:w-[870px] mx-auto mb-3">
      <p className="text-4xl font-semibold my-2">
        Add A New&nbsp;<span className="headtxt">Menu Item</span>
      </p>

      {/* { form } */}
      <div className="mt-5">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text text-white">Recipe Name</span>
            </label>
            <input
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full "
              {...register("name", { required: true })}
            />
          </div>

          {/* {2nd row} */}
          <div className="flex items-center gap-4">
            <div className="form-control w-full my-6">
              <div className="label">
                <span className="label-text text-white">Category</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Pick one
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
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text text-white">Price</span>
              </label>
              <input
                type="text"
                placeholder="price"
                className="input input-bordered w-full "
                {...register("price", { required: true })}
              />
            </div>
          </div>
          {/* {third row} */}
          <div className="form-control my-6">
            <div className="label">
              <span className="label-text text-white">Recipe Details</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24 max-w-sm"
              placeholder="Add the recipe details.."
              {...register("recipe", { required: true })}
            ></textarea>
          </div>

          <div className="form-control my-8">
            <div className="label ">
              <span className="label-text text-white">Upload recipe image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-sm"
              {...register("image", { required: true })}
            />
          </div>

          <button className="btn outline-none border-none btn-primary hover:translate-x-1 hover:bg-red hover:text-white hover:outline-none">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
