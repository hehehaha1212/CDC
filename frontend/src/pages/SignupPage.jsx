import React from "react";
import { Link } from "react-router-dom";
import signupImage from "../assets/LOGIN/loginimage.png";
import Footer from "../components/Footer";

const SignupPage = () => {
  return (
    <>
      <div className="pr-4 pl-4 md:px-5 lg:pr-10 lg:pl-14 flex flex-col-reverse lg:flex-row items-center justify-between gap-4 md:gap-20 xl:gap-40 max-w-[1300px] mx-auto text-white mt-2">
        
        {/* Left - Signup Form */}
        <form className="w-full max-w-[474px] flex-shrink-0 pt-4 space-y-3">
          
          {/* Mobile heading inside form */}
          <h1 className="block lg:hidden text-4xl font-inter font-bold text-center text-white mt-0 mb-2">
            Welcome!
          </h1>

          {/* Desktop heading */}
          <h1 className="hidden lg:block text-5xl md:text-6xl font-inter font-bold text-center mt-10">
            Welcome!
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mt-0">
            <div className="w-full">
              <label className="block mb-1 text-base">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full sm:w-[216px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block mb-1 text-base">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full sm:w-[216px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-base">Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              className="w-full h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none  sm:w-[216px]"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">College</label>
            <input
              type="text"
              placeholder="Enter your College Name"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-base">University Roll Number</label>
            <input
              type="text"
              placeholder="University Roll Number"
              className="w-full sm:w-[474px] h-[38px] px-4 py-2 rounded-lg placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full sm:w-[248px] h-[44px] mt-6 rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-semibold flex items-center justify-center mx-auto lg:mx-auto"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Right - Image */}
        <div className="w-full flex flex-col items-center justify-center flex-grow mt-2 lg:mt-0 gap-6">
          <img
            src={signupImage}
            alt="Signup"
            className="w-full max-w-[552px] h-auto object-contain rounded-xl m-0"
          />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
