import React from "react";
import placeholder from "../assets/blogs/placeholder.png";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import blogImage from "../assets/blogs/Image.png";
import Footer from "../components/Footer";
import navbarleft from '../assets/navbar/navbarleft.png';
import memberProfile from "../data/memberProfile";

const MemberProfile = ()=>{
    const member = memberProfile[0];
    return(
        <>
        <div className="relative">
        <div className="bg-transparent font-inter text-white mt-6 mx-4 md:mx-16 rounded-2xl p-6 md:p-8">
            <div className="flex w-full flex-row md:flex-row gap-6 md:gap-20 items-start md:items-start">
                <div className="w-full md:w-2/5 flex flex-row items-start md:justify-start">
                    <img src={placeholder} alt="placeholder" className="rounded-md w-30 h-30 md:w-48 md:h-48 object-cover"/>
                </div>
                <div className=" flex justify-center flex-col md:space-y-4 space-y-2">
                    <h3 className="font-inter font-semibold text-xl md:text-3xl">{member.name}</h3>
                    <h4 className="text-gray-500 font-inter text-lg md:text-xl">{member.designation}</h4>
                    
                <div className="w-full md:w-full space-y-2 mt-4 md:mt-0 md:space-y-3">
                        <p className="text-gray-500 text-sm md:text-base">
                        {member.description}
                        </p>
                        <div className="flex flex-wrap md:gap-5 gap-3 text-gray-500 text-sm">
                            {member.skills.map((skill, index) => (
                                <p key={index}>{skill}</p>
                            ))}
                        </div>
                </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-2 left-0 h-80 rounded-full opacity-10 -z-10 blur-md">
               <img src={navbarleft} alt="Left" className="h-full" />
            </div>
            <div className="absolute top-64 rotate-180 right-0 h-80 rounded-full opacity-10 -z-10 blur-md">
               <img src={navbarleft} alt="Left" className="h-full" />
            </div>
        <div>
            <div className="text-white font-inter font-bold ml-4 mr-4 px-4 mb-9 md:ml-16 md:mr-16 md:pl-8 md:pr-8 md:mb-10">
                <h4 className="text-xl">Blogs and posts</h4>
                <div className="h-[2px] w-full bg-yellow-200 mt-5 rounded-full shadow-[0_4px_12px_rgba(250,204,21,0.5)]" />
            </div>
        </div>
        {member.blogs && member.blogs.length > 0 ? (
          <div className="ml-4 mr-4 md:ml-16 md:mr-16 md:px-8 px-4 grid grid-cols-2 md:grid-cols-3 gap-6">
            {member.blogs.map((blog, i) => (
              <BlogCard
                key={i}
                title={blog.title}
                description={blog.description}
                date={blog.date}
                image={blog.image || defaultBlogImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-white px-6">No blogs available.</p>
        )}
        </div>
        </>
    )
}

export default MemberProfile