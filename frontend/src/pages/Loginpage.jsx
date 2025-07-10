import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginimage from "../assets/LOGIN/loginimage.png";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Footer from "../components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-14 max-w-[1200px] mx-auto  pb-32  pt-16">

        
        {/* Image section */}
        <div className="order-1 lg:order-2 flex-1 min-w-[280px] max-w-[552px] w-full flex justify-center mb-2 ">
          <img
            src={loginimage}
            alt="Login"
            className="w-full max-w-[552px] h-auto pr-4 pl-4 object-contain rounded-xl pb-6"
          />
        </div>

        {/* Form section */}
        <div className="order-2 lg:order-1 flex flex-col items-center flex-1 min-w-[280px] max-w-[500px] w-full text-white">
          
          {/* Heading shown on large screens inside form */}
          <h1 className="hidden lg:block md:text-6xl font-bold mb-6 text-center">
            Welcome!
          </h1>

          <div className="w-[386px] flex flex-col">
            
            {/* Heading shown on small screens BETWEEN image and form fields */}
            <h1 className="block lg:hidden text-5xl font-bold text-center text-white mb-10">
              Welcome!
            </h1>

            <div className="mb-6 pr-4 pl-4">
              <label className="block mb-2 text-gray-400 leading-[25px] text-[23px] font-inter">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-[48px] text-[18px] px-4 py-3 rounded-lg text-white placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none"
              />
            </div>

            <div className="mb-2 pr-4 pl-4">
              <label className="block mb-2 text-gray-400 leading-[25px] text-[23px] font-inter font-light">
                Password
              </label>
              <div className="relative w-full ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 bg-gradient-to-r from-[#47446A] to-[#2F2C58] focus:outline-none pr-10 text-[18px]"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </span>
              </div>
            </div>

            <p className="text-gray-400 mb-3 pb-4 pl-4 text-start hover:underline cursor-pointer font-sans italic text-[20px]">
              Forgot your Password?
            </p>

            <p className="text-[23px] mb-4 text-center font-inter">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#6568FF] text-[23px] leading-[12px] hover:underline cursor-pointer font-inter">
                SignUp
              </Link>
            </p>

            <button className="w-[248px] h-[37px] rounded-lg bg-gradient-to-r from-[#4C4FB6] to-[#2C2D88] text-white font-semibold uppercase flex items-center justify-center mx-auto">
              Login
            </button>
          </div>
        </div>
      </div>
  

    </>
  );
};

export default Login;
