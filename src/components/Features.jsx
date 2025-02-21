import React from "react";
import budget from "../assets/budget.jpg";
import realtimetrack from "../assets/realtime_track.jpg";
import insight from "../assets/insight.jpg";
import { useState } from "react";

function Features() {
  const [activeTab, setActiveTab] = useState("panel-1");

  //handle the tab click with the state
  const handleTabClick = (targetPanel) => {
    setActiveTab(targetPanel);
  };
  return (
    <>
      <section>
        <div className="mx-auto mt-16 px-6 min-h-full">
          <h2 className="mb-6 text-4xl text-center text-gray-600 font-bold">
            Features
          </h2>
          <p className="max-w-md mx-auto text-center text-gray-500">
            Take control of your finances with our powerful and easy-to-use
            budget tracker. Designed to help you stay on top of your spending,
            save more, and reach your financial goals, our tool comes with a
            variety of features tailored for your need.
          </p>
        </div>
      </section>

      <section>
        <div className="relative mx-auto my-6 mb-32 mt-12 px-6">
          <div className="flex flex-col justify-center mx-auto max-w-xl mb-6 border-b md:space-x-10 md:flex-row">
            {/* first tab */}
            <div
              className={`flex justify-center text-center border-b text-gray-600 md:border-b-0 hover:text-blue-600 ${
                activeTab === "panel-1" ? "border-b-4 border-blue-600" : ""
              }`}
              onClick={() => handleTabClick("panel-1")}
            >
              <div
                className="py-5 border-b-1 border-blue-500 "
                data-target="panel-1"
              >
                Real-Time Tracking
              </div>
            </div>

            {/* second tab */}
            <div
              className={`flex justify-center text-center border-b text-gray-600 md:border-b-0 hover:text-blue-600 ${
                activeTab === "panel-2" ? "border-b-4 border-blue-600" : ""
              }`}
              onClick={() => handleTabClick("panel-2")}
            >
              <div className="py-5 " data-target="panel-2">
                Insightful Reports & Analytics
              </div>
            </div>

            {/* third tab */}
            <div
              className={`flex justify-center text-center border-b text-gray-600 md:border-b-0 hover:text-blue-600 ${
                activeTab === "panel-3" ? "border-b-4 border-blue-600" : ""
              }`}
              onClick={() => handleTabClick("panel-3")}
            >
              <div className="py-5 " data-target="panel-3">
                Smart Expense Categorization
              </div>
            </div>
          </div>

          {/* tab panels */}
          <section>
            <div className="mx-auto">
              <div
                className={`flex flex-col py-5 md:flex-row md:space-x-7 ${
                  activeTab === "panel-1" ? "" : "hidden"
                } justify-center`}
              >
                <div className="flex justify-center ">
                  <img
                    className="mt-2 h-70 w-70 rounded-l-4xl"
                    src={realtimetrack}
                    alt=""
                  />
                </div>
                <div>
                  <p className="mt-30 md:max-w-md text-center text-gray-500">
                    Easily track all sources of income, whether it's your
                    salary, freelance work, or passive income, and gain complete
                  </p>
                </div>
              </div>

              <div
                className={`flex flex-col py-5 md:flex-row md:space-x-7 ${
                  activeTab === "panel-2" ? "" : "hidden"
                } justify-center`}
              >
                <div className="flex justify-center ">
                  <img
                    className="mt-2 h-70 w-70 rounded-r-4xl"
                    src={insight}
                    alt=""
                  />
                </div>
                <div>
                  <p className="mt-20 md:max-w-md text-center text-gray-500">
                    Visual charts and reports that help you understand your
                    spending patterns and make smarter financial decisions these
                    reports empower you to take control of your money and
                    optimize your spending.
                  </p>
                </div>
              </div>

              <div
                className={`flex flex-col py-5 md:flex-row md:space-x-7 ${
                  activeTab === "panel-3" ? "" : "hidden"
                } justify-center`}
              >
                <div className="flex justify-center ">
                  <img
                    className="mt-2 h-70 w-70 rounded-l-4xl"
                    src={budget}
                    alt=""
                  />
                </div>
                <div>
                  <p className="mt-20 md:max-w-md text-center text-gray-500">
                    Let our tracker automatically categorize your expenses based
                    on your spending habits, saving you time and effort. If you
                    prefer a more personalized approach, you can easily create
                    custom categories that align with your unique lifestyle
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default Features;
