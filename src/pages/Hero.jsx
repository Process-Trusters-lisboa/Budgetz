import React from "react";
import expensehero from "../assets/expensehero.jpg";
import { useState, useEffect } from "react";

function Hero() {
  const [headingColor, setHeadingColor] = useState("text-gray-700");

  const colorOptions = [
    "text-gray-700",
    "text-blue-400",
    "text-cyan-600",
    "text-green-400",
    "text-yellow-500",
    "text-purple-500",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * colorOptions.length);
      setHeadingColor(colorOptions[randomIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-h-screen mx-auto">
      <section>
        <div className="flex flex-col-reverse mx-auto p-6 md:flex-row items-center">
          <div className="flex flex-col space-y-10">
            <h1
              className={`mt-22 text-5xl text-center font-semibold ${headingColor} animate-slide transition-colors duration-1000`}
            >
              Your Smart Budget Manager
            </h1>
            <p className="max-w-md mx-auto text-3xl text-center text-gray-600">
              The easy way to take control of your finances. Whether you're
              saving for a goal or managing daily expenses, our platform helps
              you track spending, set budgets, and stay on top of your financial
              goals. Simplify your finances and achieve financial peace of mind
              with real-time insights from our smart budgeting tool.
            </p>
          </div>
          <div className="relative mx-auto md:ml-35">
            <img
              className="mt-2 w-full h-auto max-w-md md:max-w-lg lg:max-w-xl rounded-l-4xl rounded-r-2xl"
              src={expensehero}
              alt="Budget Manager"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
