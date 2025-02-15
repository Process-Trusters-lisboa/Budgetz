import React from "react";
import lisbonImage from "../assets/Lisbon.png";

function Hero() {
  return (
    <>
      <section>
        <div className="flex flex-col-reverse mx-auto p-6 md:flex-row mb-20 mt-20">
          <div className="flex flex-col space-y-10">
            <h1 className="text-5xl text-center font-semibold sm: mt-10">
              Your Smart Budget Manager
            </h1>
            <p className="max-w-md mx-auto text-lg text-center text-gray-500">
              the easy way to take control of your finances. Whether you're
              saving for a goal or managing daily expenses, our platform helps
              you track spending, set budgets, and stay on top of your financial
              goals. Simplify your finances and achieve financial peace of mind
              with real-time insights and smart budgeting tools.
            </p>
          </div>
          <div className="relative mx-auto md:ml-35">
            <img className="relative z-10 w-100 h-auto mt-8 rounded-l-4xl" src={lisbonImage} alt="lisbon" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
