import React from "react";
import ReviewCard from "../components/ReviewCard";
import placeholder from "../assets/image11.png";
import insta from "../assets/socialmedia/insta.png";
import tele from "../assets/socialmedia/telegram.png";
import youtube from "../assets/socialmedia/youtube.png";
import linkedin from "../assets/socialmedia/linkedin.png";


const Review=()=>{
    return(
        <div className="relative bg-transparent w-full h-auto">
            <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl mt-10">What Others Think About Us
            </h2>
            <div className="hidden custom-md2:grid md:grid-cols-3 justify-items-center gap-0 my-7 mx-14 ">
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 custom-md2:hidden justify-items-center gap-6 m-7 ">
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
            </div>
             <div className="grid grid-cols-1 block sm:hidden justify-items-center gap-6 m-7 ">
                <ReviewCard name="Aditi Rai" batch="CSE'28" description="Organize interactive sessions and workshops to raise and workshops to raise awareness about coding and other key tech domains" image={placeholder}/>
            </div>
            <div>
                <h2 className="text-white text-center font-inter font-bold text-3xl sm:text-4xl custom-md2:text-5xl custom-md3:text-6xl mt-14">Join Our Community</h2>
                <div className=" grid grid-cols-4 gap-10% m-[4%] justify-items-center hidden sm:grid">
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[170px] rounded-xl m-4 h-[120px] custom-md3:h-[176px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={insta} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[89px] custom-md3:h-[89px]"/>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-4xl text-white mt-2">1.2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[170px] rounded-xl m-4 h-[120px] custom-md3:h-[176px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={linkedin} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[89px] custom-md3:h-[89px]"/>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-4xl text-white mt-2">2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[170px] rounded-xl m-4 h-[120px] custom-md3:h-[176px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={tele} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[89px] custom-md3:h-[89px]"/>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-4xl text-white mt-2">1.1K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] custom-md3:w-[170px] rounded-xl m-4 h-[120px] custom-md3:h-[176px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={youtube} alt="" className="mt-4 custom-md3:mt-6 ml-6 mr-6 w-[60px] h-[60px] custom-md3:w-[89px] custom-md3:h-[89px]"/>
                        <h4 className="text-center font-inter font-bold text-3xl custom-md3:text-4xl text-white mt-2">300+</h4>
                    </div>
                </div>
                <div className=" grid grid-cols-2 gap-10% m-[2%] justify-items-center sm:hidden">
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] rounded-xl m-4 h-[120px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={insta} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[60px] h-[60px]"/>
                        <h4 className="text-center font-inter font-bold text-2xl text-white mt-1">1.2K+</h4>
                    </div>
                     <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] rounded-xl m-4 h-[120px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={linkedin} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[60px] h-[60px]"/>
                        <h4 className="text-center font-inter font-bold text-2xl text-white mt-1">2K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] rounded-xl m-4 h-[120px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={tele} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[60px] h-[60px]"/>
                        <h4 className="text-center font-inter font-bold text-2xl text-white mt-1">1.1K+</h4>
                    </div>
                    <div className="bg-[#1A1B3A] shadow-[0_0_20px_8px_rgba(92,97,242,0.3)] w-[120px] rounded-xl m-4 h-[120px] transition-all duration-300 hover:scale-110 hover:[border-top-right-radius:40px] hover:[border-bottom-left-radius:40px] hover:shadow-lg justify-items-center">
                        <img src={youtube} alt="" className="mt-4 custom-md2:mt-6 ml-6 mr-6 w-[60px] h-[60px]"/>
                        <h4 className="text-center font-inter font-bold text-2xl text-white mt-1">300K+</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;