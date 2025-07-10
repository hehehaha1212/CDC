import { Link } from "react-router-dom";
import React from "react";
import Herosection from "../sections/Herosection";
import AboutUs from "../sections/AboutUs";
import Reviews from "../sections/Reviews";
import Carousel3D from "../sections/Carousel3D";


const Home = () => {
  return (
    <>
      <Herosection />
      <AboutUs />
      <Carousel3D />
      <Reviews />
    </>
  );
};

export default Home;
