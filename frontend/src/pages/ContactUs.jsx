import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import contactImg from "../assets/Rectangle.png";
import phoneIcon from "../assets/phoneIcon.png";
import mailIcon from "../assets/mailIcon.png";

const ContactUs = () => {
  return (
    <div className="min-h-screen">


      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div className="relative w-full h-[500px] md:h-auto rounded-xl overflow-hidden">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full h-full object-cover mr-10 py-12"
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 rounded-xl p-6 flex flex-col justify-start items-start">
            <h2 className="text-6xl font-bold font-inter mb-4 text-white">
              Contact Us
            </h2>
            <p className="mb-6 text-gray-300 text-lg font-inter">
              Feel free to contact us, we will get back to <br /> you as soon as
              possible
            </p>
            <br />

            <div className="space-y-3 text-base text-white">
              <div className="flex items-center gap-2">
                <img
                  src={phoneIcon}
                  alt="phone Icon"
                  className="w-6 h-5 mr-2"
                />
                <a
                  href="tel:9876567890"
                  className="text-gray-300 hover:underline font-inter"
                >
                  9876567890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={mailIcon}
                  alt="mail Icon"
                  className="w-6 h-6 mr-2"
                />
                <a
                  href="mailto:cdc.mmmut@gmail.com"
                  className="text-gray-300 hover:underline font-inter"
                >
                  cdc.mmmut@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <form className="space-y-6">
          {/* Grid for First and Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-4">
            <div className="flex flex-col w-full">
              <label
                htmlFor="firstName"
                className="text-lg font-medium font-inter text-white mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder=""
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
              />
            </div>
            <div className="flex flex-col w-full">
              <label
                htmlFor="lastName"
                className="text-lg font-medium font-inter text-white mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder=""
                className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_22%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            />
          </div>

          {/* Phone Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="phone"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="message"
              className="text-lg font-medium font-inter text-white mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder=""
              className="w-full px-4 py-3 md:py-3.5 bg-[linear-gradient(to_right,_#3D3E56_0%,_#23244A_74%)] bg-opacity-20 rounded-lg outline-none text-white placeholder-gray-300 text-sm font-medium"
            ></textarea>
          </div>

        
          <div className="flex justify-center">
  <button
    type="submit"
    className="w-[160px] md:w-[190px] bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 md:py-3.5 px-4 md:px-0 rounded-lg border-white outline transition duration-300 font-inter text-sm md:text-xl"
  >
    Submit
  </button>
</div>


        </form>
      </div>

    
    </div>
  );
};

export default ContactUs;
