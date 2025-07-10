import React from 'react';
import blogimage from '../assets/blogs/blogimage.png';
import menu from '../assets/blogs/menu.png';
const Blog = () => {
  return (
    <>
    <div className=" text-white mt-6 md:mt-12 ml-8 mr-8 md:ml-24 md:mr-24 ">
      <div
        className="w-full h-[140px] md:h-[240px] bg-cover bg-center relative items-center opacity-70"
        style={{ backgroundImage: `url(${blogimage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30 font-sans"></div>
        <div className="relative z-10 max-w-4xl px-6 py-4 md:px-12 font-sans">
          <h1 className="text-base md:text-3xl text-white drop-shadow-[3px_3px_1px_rgb(255,255,255,0.7)] md:drop-shadow-[5px_7px_3px_rgb(255,255,255,0.5)] md:text-4xl font-bold">
            AMD’s AI Surge Challenges
          </h1>
          <h2 className="text-sm md:text-xl text-white drop-shadow-[3px_3px_1px_rgb(255,255,255,0.7)] md:drop-shadow-[5px_7px_3px_rgb(255,255,255,0.5)] md:text-2xl text-gray-300 mt-2">
            Nvidia’s Dominance
          </h2>
          <p className="text-xs md:text-sm mt-2 text-white drop-shadow-[3px_3px_1px_rgb(255,255,255,0.7)] md:drop-shadow-[5px_7px_3px_rgb(255,255,255,0.5)]">BY: <span className="text-white">YOUR NAME</span></p>
          <p className="text-sm md:text-base text-white drop-shadow-[3px_3px_1px_rgb(255,255,255,0.7)] md:drop-shadow-[5px_7px_3px_rgb(255,255,255,0.5)]">DATE: 21st March</p>
        </div>
      </div>
      <div className='mt-6'>
        <img src={menu} alt="menu" className="w-6 sm:w-10"/>
      </div>
      <div className="h-[2px] w-full bg-yellow-200 mt-5 rounded-full shadow-[0_4px_12px_rgba(250,204,21,0.5)]" />

      <div className=" w-full py-10 space-y-4 text-sm md:text-xl text-gray-200 leading-relaxed" style={{fontFamily:'Mina-Regular'}}>
        <p>
          For years, Nvidia’s H100 GPUs have been the undisputed kings of the AI jungle, the apex predators
          that every competitor wants to dethrone.
        </p>
        <p>
          But here in Silicon Valley — where I'm writing this and where a good underdog story is always
          appreciated, AMD is roaring onto the scene with its Instinct MI300 series and the upcoming MI350
          series, demonstrating not just competitive prowess but a significant, open-source-driven lead in key
          AI training and inference workloads.
        </p>
        <p>
          In a world where cutting-edge hardware is harder to get than a unicorn on a skateboard, AMD’s
          strategy of being not just “good enough” but demonstrably superior, particularly in...
        </p>
         <div>
        <h2 className="mt-10 text-xl md:text-3xl text-white" style={{
          fontFamily:'Mina-Bold'
        }}>
          Unleashing Raw Power: AMD’s MLPerf Dominance
        </h2>
        </div>
        <p>
          AMD’s recent debut in the MLPerf Training v5.0 benchmarks wasn’t just an entry; it was a thunderclap.
          This critical benchmark for AI training, focusing on real-world workloads.
        </p>
        <p>
          Let that sink in: AMD, the perennial challenger, just demonstrated a lead over Nvidia’s latest in a
          head-to-head, real-world AI training scenario. The AMD Instinct MI300X platforms also delivered
          competitive performance compared to the Nvidia H100 on the same workload, proving that both AMD GPU
          platforms in the Instinct MI300 Series are potent solutions for diverse training needs.
        </p>
      </div>
    </div>
    </>
  );
};

export default Blog;