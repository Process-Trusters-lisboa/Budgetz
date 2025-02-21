import React from "react";
import Hero from "../pages/Hero";
import Faq from "../components/Faq";
import Features from "../components/Features";

function Homepage() {
  return (
    <>
      <div className="container relative mx-auto  h-screen flex-grow">
        <Hero />
        {/* <Features/> */}
      </div>
    </>
  );
}

export default Homepage;
