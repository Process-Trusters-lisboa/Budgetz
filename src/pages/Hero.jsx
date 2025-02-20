import React from "react";
import expensehero from '../assets/expensehero.jpg'

function Hero() {
  return (
    <div className="h-full min-h-full mx-auto">
      <section>
        <div className="flex flex-col-reverse mx-auto p-6 md:flex-row items-center ">
          <div className="flex flex-col space-y-10">
            <h1 className="mt-22 text-5xl text-center font-semibold text-gray-700">
              Your Smart Budget Manager
            </h1>
            <p className="max-w-md mx-auto text-lg text-center text-gray-600">
              The easy way to take control of your finances. Whether you're
              saving for a goal or managing daily expenses, our platform helps
              you track spending, set budgets, and stay on top of your financial
              goals. Simplify your finances and achieve financial peace of mind
              with real-time insights from our smart budgeting tool.
            </p>
          </div>
          <div className="relative mx-auto md:ml-35">
            <img className="mt-2 h-100 w-80 rounded-l-4xl rounded-r-2xl" src={expensehero} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
