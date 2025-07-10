import React from "react";
// run this command on terminal: npm install react-router-dom
import { useNavigate } from "react-router-dom";
// run this command on terminal: npm install framer-motion
import { motion } from "framer-motion";

const ResourceCard = ({ title, description, image, reverse }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    // abhi currently testing k liye blog page daal diya hai....
    // BlogsPage k jagah roadmaps ka page hoga
    navigate("/BlogsPage");
  };

  return (
    // for animation and transition
    <motion.div
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative"
    >
      {/* Resource card */}
      <div
        className={`flex flex-row ${
          reverse ? "flex-row-reverse" : ""
        } justify-between border border-white/50 bg-[#6568FF]/10 font-inter font-medium text-white mt-2 mb-2 mx-4 md:mx-16 px-4 md:px-6 py-4 md:py-5 rounded-3xl items-center`}
      >
        {/* Text Section : Tittle and Description */}
        <div className="w-3/5 mx-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            {title}
          </h3>
          <p className="text-sm md:text-xl text-white/80 text-justify mb-3">
            {description}
          </p>

          {/* Learn more Button  (Learn more button below description)*/}
            <button
              onClick={handleLearnMore}
              className="mt-1 bg-white text-black px-3 py-1 rounded-3xl font-semibold hover:bg-[#9294f9] transition duration-300"
            >
              Learn More
            </button>
        </div>

        {/* Image Section */}
        <div className="md:w-[200px] flex flex-col items-center">
          <img
            src={image}
            alt={title}
            className="w-[180px] h-[130px] md:w-[250px] md:h-[170px] rounded-md object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ResourceCard;
