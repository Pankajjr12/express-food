import React, { useEffect } from "react";
import logo from "../../anim/food.jpg";
const Privacy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="section-container space-y-5 my-5">
      <div className="card card-compact  h-screen shadow-xl ">
        <figure className="bg-maroon py-10 lg:py-30 z-0 relative">
          <div className="absolute inset-0 bg-maroon opacity-50"></div>
          <p className="text-lg font-bold text-white relative z-10">Terms & Conditions</p>
        </figure>
        <div className="card-body">
          <h2 className=" card-title">Our Policy</h2>

          <div className="card-actions justify-end text-justify text-wrap mt-4">
            <ul>
              <li>
                <h2 className="text-white">Privacy Policy</h2>

                <p>
                  Welcome to [Food Express]! We understand that privacy is
                  important to our users. Please read this Privacy Policy
                  carefully. By using the App, you agree to the terms of this
                  Privacy Policy.
                </p>
              </li>
              <br />
              <h3 className="underline">Information We Collect</h3>
              <p>
                - Personal Information: We may collect personal information such
                as your name, email address, and phone number when you register
                for an account or contact us.
              </p>
              <br />
              <h3 className="underline">Security</h3>
              <p>
                - We take reasonable measures to protect your information from
                unauthorized access or disclosure.
              </p>
              <br />
              <li>
                <h2 className="text-white">Terms of Service</h2>

                <p>
                  Welcome to [Food Express]! By using our mobile application
                  (the "App"), you agree to these Terms of Service. Please read
                  them carefully.
                </p>
              </li>
              <br />
              <h3 className="underline">Changes to Terms</h3>
              <p>
                - We may update these Terms of Service from time to time. We
                will notify you of any changes by posting the new Terms of
                Service on the App.
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
