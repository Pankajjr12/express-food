import React from "react";

const servicesList = [
  {
    id: 1,
    title: "catering",
    des: " jfvn frelkfn kfnvk kdck dkljl lkd",
    image: "/images/img1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: " jfvn frelkfn kfnvk kdck dkljl lkd",
    image: "/images/img2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: " jfvn frelkfn kfnvk kdck dkljl lkd",
    image: "/images/img3.png",
  },
  {
    id: 4,
    title: "Coupons",
    des: " jfvn frelkfn kfnvk kdck dkljl lkd",
    image: "/images/thali3.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 ">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Services</p>
            <h3 className="title">Check out our services</h3>
            <p className="my-5 text-secondary leading-[30px]">
              Just like put the person in right place to make them feel good the
              same goes for dish put the ingredients at right place in order to makes dish
              delicious.
            </p>

            <button className="btn bg-blue text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>

        <div className="md:w-1/2 hidden md:flex">
          {/* <img
            src="/images/home/testimonials/testimonials.png"
            alt=""
            className="rounded-full"
          /> */}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
            {servicesList.map((services) => (
              <div
                key={services.id}
                className="py-5 px-5 text-center bg-black rounded-2xl space-y-2 text-blue cursor-pointer  hover:bg-red shadow-md transition-all duration-300 "
              >
                <img
                  src={services.image}
                  alt=""
                  className="mx-auto rounded-3xl"
                />
                <h5 className="pt-3 font-semibold">{services.title}</h5>
                <p className="text-[#90BD95] px-2">{services.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
