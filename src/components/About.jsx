import React from "react";
import { useState } from "react";
import profilepic from "../assets/profilepic.jpg";
import githubpic from "../assets/github_trans.png";
import githubb from "../assets/githubb.png";
import html from "../assets/html.png";
import tailwind from "../assets/tailwind.png";
import javascrp from "../assets/javascript.png";
import ract from "../assets/react.png";
import fbase from "../assets/firebase.png";
import linked from "../assets/linkIn.png";
import { SocialIcon } from "react-social-icons";
import Telmo from "../assets/Telmo1.jpg";

function About() {
  //  const [isClicked, setisClicked] = useState(false);

  // yesisClicked = () => {
  //   setisClicked(isClicked)
  // }

  return (
    <>
      <section className="border-none shadow-none outline-none overflow-hidden">
        <h1 className="mt-16 text-center tracking-widest text-gray-600 font-bold text-4xl">
          About our Project
        </h1>
        <div>
          <p className="tracking-widest text-gray-500 font-medium text-center mt-5">
            Welcome to Budgetz. We believe everyone deserves control over their
            finances. That's why we've created an intuitive budget tracker to
            help you manage your spending, save more, and achieve your financial
            goals with ease. Whether you're budgeting for the month, tracking
            daily expenses, or planning for the future, our tool is designed
            with features to meet your unique needs and make money management
            simple and effective.
          </p>
        </div>
        <div className=" mt-20 flex items-center justify-center min-h-full border-none shadow-none outline-none overflow-hidden">
          <div className=" flex-col items-center m-6 space-y-10 shadow-2xl outline-none rounded md:flex flex-row md:space-y-0 md:m-0">
            {/* first profile */}
            <div className="flex justify-center rounded-2xl border-2 border-y-blue-600 border-x-gray-200 h-90 w-80 items-center justify-between md:p-20">
              <div>
                <div className="flex items-center justify-center">
                  <img
                    src={profilepic}
                    alt="profile-pic"
                    className="h-35 w-35 items-center mb-10 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-center text-xl text-gray-600 font-bold">
                    Samuel Onoja
                  </h1>
                </div>

                <div className="flex space-x-10 mt-5">
                  <div>
                    <SocialIcon url="https://github.com/Samuelonoja" />
                  </div>
                  <div>
                    <SocialIcon url="https://www.linkedin.com/in/samuelonoja" />
                  </div>
                </div>
              </div>
            </div>

            {/* second profile */}
            <div className="flex justify-center rounded-2xl border-2 border-y-blue-300 border-x-gray-400 h-90 w-80 items-center justify-between md:p-20">
              <div>
                <div className="flex items-center justify-center">
                  <img src={Telmo} alt="Profile Picture" className="h-35 w-35 items-center mb-10 rounded-full"/>                    
                </div>
                <div>
                  <h1 className="text-center text-xl text-gray-600 font-bold">
                    Telmo Lousada
                  </h1>
                </div>

                <div className="flex space-x-10 mt-5">
                  <div>
                    <SocialIcon url="https://github.com/TelmoLousada" />
                  </div>
                  <div>
                    <SocialIcon url="https://www.linkedin.com/in/telmo-lousada/" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-2xl text-gray-600 font-bold mt-20">
          <h1>Tools Used</h1>
        </div>
        <div className="flex flex-col md:flex-row space-x-5 mt-5 items-center justify-center mb-10">
          <div>
            <img src={javascrp} alt="img" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <img src={ract} alt="img" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <img src={html} alt="img" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <img src={tailwind} alt="img" className="h-10 w-10 rounded-full" />
          </div>
          <div>
            <img src={fbase} alt="img" className="h-10 w-10 rounded-full" />
          </div>
          <div className="bg-black rounded-full">
            <img
              src={githubb}
              alt="img"
              className="h-10 w-10 rounded-full cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
