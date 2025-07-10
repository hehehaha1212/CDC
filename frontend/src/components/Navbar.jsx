import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/navbar/Monochromewhite_CDC.png';
import navbarleft from '../assets/navbar/navbarleft.png';
import discord from '../assets/navbar/discord.png';
import twitter from '../assets/navbar/twitter.png';
import github from '../assets/navbar/github.png';
import instagram from '../assets/navbar/instagram.png';
import navbarright from '../assets/navbar/navbarright.png';
import menu from '../assets/navbar/menu.png';
const Navbar = () => {
    return (
        <nav className="w-full font-inter text-white top-0 z-55">
            {/*navbar desktop view*/}
            <div className="hidden md:flex items-center justify-between py-0 m-0 h-[32%]">
                <div className="flex space-x-[1.8vw] w-[18%]">
                    <div className=" flex flex-col justify-between w-[32%]">
                        <div className="">
                            <img src={navbarleft} alt="Left" className="w-[90%]" />
                        </div>
                        <div className="h-[4%]"></div>
                    </div>
                    <div className="flex-shrink-0 flex items-center">
                        <img src={logo} alt="Logo" className="w-[7.3vw]" /> {/* Adjust height if needed */}
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <ul class="flex space-x-8 text-[1.65vw] font-bold tracking-wider uppercase">
                        <li><Link to="/" class="hover:text-blue-400">Home</Link></li>
                        <li><Link to="/event" class="hover:text-blue-400">Events</Link></li>
                        <li><Link to="/resources" class="hover:text-blue-400">Resources</Link></li>
                        <li><Link to="/team" class="hover:text-blue-400">Team</Link></li>
                        <li><Link to="/contact" class="hover:text-blue-400">Contact</Link></li>
                        <li><Link to="/login" class="hover:text-blue-400">Login</Link></li>
                    </ul>
                </div>
                <div className=" w-[22%] flex justify-end relative h-[100%]">
                    <img src={navbarright} alt="Left" className="w-[19.8vw] h-[100%]"/>
                    <div className="absolute top-[40%] right-[35%] flex space-x-[1vw]">
                        <a href="#" class="hover:text-blue-400"> <img src={github} alt="Left" className="w-[1.6vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={discord} alt="Left" className="w-[1.6vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={instagram} alt="Left" className="w-[1.6vw]" /></a>
                        <a href="#" class="hover:text-blue-400"><img src={twitter} alt="Left" className="w-[1.6vw]" /></a>
                    </div>
                </div>
            </div>
            {/* Navbar mobile view */}
            <div className="flex justify-between items-center w-full pl-2 pr-3 h-14 md:hidden lg:mt-4 md:mt-2 sm-mt:0">
                <img src={logo} alt="Logo" className="h-10 md:h-16 lg:h-20"  />
                <div className="text-xl sm:text-2xl custom-md:text-5xl font-bold text-center">
                    Coders & Developers Club
                </div>
                <div className="cursor-pointer">
                    <img src={menu} alt="menu" className="h-4 sm:h-6 custom-md:h-8" />
                </div>
            </div>

        </nav>
    )
}
export default Navbar;