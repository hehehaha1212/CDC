
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MemberProfile from "./pages/MemberProfile";
import BlogsPage from "./pages/BlogsPage";
import Members from "./pages/Members";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./sections/AboutUs";
import Reviews from "./sections/Reviews";
import Herosection from "./sections/Herosection";
import Carousel3D from "./sections/Carousel3D";
import EventCard from "./components/EventPage/EventCard";
import StatsCard from "./components/EventPage/StatsCard";
import WinnerCard from "./components/EventPage/WinnerCard";
import ResourcePage from "./pages/ResourcePage.jsx";
import Loginpage from "./pages/Loginpage.jsx";
import Home from "./pages/Home.jsx";
import SignupPage from "./pages/SignupPage.jsx";


function App() {
  return (
    <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/resources" element={<ResourcePage/>}/>
          <Route path="/team" element={<Members/>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
