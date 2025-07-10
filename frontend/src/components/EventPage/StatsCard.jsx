import React from "react";
import timelineData from "../../data/timelineData.js";
import flag from "../../assets/events/icon_2.png";
import man from "../../assets/events/icon_1.png";

const StatsCard = () => {
  const { stats } = timelineData[0];

  return (
    <div className="rounded-2xl border border-violet-500 p-6 w-2/5 h-44 bg-gradient-to-br from-[#2A174E] to-[#311B63] text-white mx-auto">
      <div className="flex flex-col md:flex-row justify-around items-center gap-8 mt-3">
 
        <div className="flex items-center gap-4">
          <img src={man}/>
          <div>
            <div className="text-3xl font-bold">{stats.workshops}+</div>
            <div className="text-lg font-medium text-purple-200">
              Students Attended <br /> Workshops
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img src={flag}/>
          <div>
            <div className="text-3xl font-extrabold">{stats.participants}+</div>
            <div className="text-lg font-medium text-purple-200">
              Participated in <br /> Competition
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;