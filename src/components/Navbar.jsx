import React from "react";
import lisbonImage from "../assets/Lisbon.png";

function Navbar() {
  return (
    <div>
      {/* navbar container */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* navbar logo */}
        <div className="z-10 flex space-x-2 font-bold tracking-widest">
          <img className="h-8" src={lisbonImage} alt="lisbon" />
          <h1>Budgetz</h1>
        </div>

        <div className="hidden items-center space-x-10 uppercase text-gray-500 md:flex">
          <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
            about
          </p>
          <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
            Features
          </p>
          <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
            Faq
          </p>
          <button className="uppercase p-3 border bg-blue-50 hover:bg-white border-blue-600 rounded-lg hover:text-blue-800 hover:font-bold cursor-pointer shadow-2xl">
            My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

// h-15 bg-gradient-to-l from-purple-500 to-blue-300
