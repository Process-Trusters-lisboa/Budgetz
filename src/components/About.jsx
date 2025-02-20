import React from "react";
import { useState } from "react";
import profilepic from "../assets/profilepic.jpg";
import githubpic from "../assets/github_trans.png";
import linked from "../assets/linked.png";

function About() {
  //  const [isClicked, setisClicked] = useState(false);

  // yesisClicked = () => {
  //   setisClicked(isClicked)
  // }

  return (
    <>
      <section className="border-none shadow-none outline-none overflow-hidden">
        <h1 className="mt-16 text-center tracking-widest text-gray-500 font-bold text-4xl">About our Project</h1>
        <div>
          <p className="tracking-widest text-gray-500 font-medium text-center mt-5">
            Welcome to Budgetz, we believe everyone
            deserves control over their finances. That's why we've created an
            intuitive budget tracker to help you manage your spending, save
            more, and achieve your financial goals with ease. Whether you're
            budgeting for the month, tracking daily expenses, or planning for
            the future, our tool is designed with features to meet your unique
            needs and make money management simple and effective.
          </p>
        </div>
        <div className=" mt-20 flex items-center justify-center min-h-full border-none shadow-none outline-none overflow-hidden">
          <div className=" flex-col items-center m-6 space-y-10 shadow-2xl outline-none rounded md:flex flex-row md:space-y-0 md:m-0">
            {/* first profile */}
            <div className="flex justify-center rounded-2xl border-2 border-y-blue-600 border-x-gray-300 h-90 w-80 items-center justify-between md:p-20">
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={profilepic}
                    alt="profile-pic"
                    className="h-35 w-35 items-center mb-10 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-center">Samuel Onoja</h1>
                </div>

                <div className="flex space-x-5 mt-5">
                  <div>
                  <img src={githubpic} alt="git" />
                  </div>
                  <div>
                    <h1 className="text-center">Samuel Onoja</h1>
                  </div>
                </div>
              </div>
            </div>

            {/* first profile */}
            <div className="flex justify-center rounded-2xl border-2 border-y-blue-300 border-x-gray-300 h-90 w-80 items-center justify-between md:p-20">
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={profilepic}
                    alt="profile-pic"
                    className="h-35 w-35 items-center mb-10 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-center">Samuel Onoja</h1>
                </div>

                <div className="flex space-x-5 mt-5">
                  <div>
                  <img src={githubpic} alt="git" />
                  </div>
                  <div>
                    <h1 className="text-center">Samuel Onoja</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
