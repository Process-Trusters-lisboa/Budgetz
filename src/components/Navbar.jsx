import React from "react";
import lisbonImage from "../assets/Lisbon.png";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function Navbar() {
  return (
    <div>
      {/* navbar container */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* navbar logo */}
        <Link to="/">
          <div className="z-10 flex space-x-2 font-bold tracking-widest">
            <img className="h-8" src={lisbonImage} alt="lisbon" />
            <h1>Budgetz</h1>
          </div>
        </Link>

        <div className="hidden items-center space-x-10 uppercase text-gray-500 md:flex">
          <Link to="about">
            <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
              about
            </p>
          </Link>
          <Link to="features">
            <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
              Features
            </p>
          </Link>
          <Link to="faq">
            <p className="hover:text-blue-800 hover:font-bold cursor-pointer">
              Faq
            </p>
          </Link>
          <Link to="dashboard">
            <button className="uppercase p-3 border bg-blue-50 hover:bg-white border-blue-600 rounded-lg hover:text-blue-800 hover:font-bold cursor-pointer shadow-2xl">
              My Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
