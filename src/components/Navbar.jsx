import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  //firebase google authentication
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  //googleSignIn and Navigate to Homepage.

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const currentUser = result.user;
      setUser(currentUser);
      console.log("Signed in as", currentUser.displayName);

      navigate("/dashboard");
    } catch (e) {
      console.log("Failed to sign in with Google", e);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log("Failed to sign in with Google", e);
    }
  };

  return (
    <div>
      {/* navbar container */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* navbar logo */}
        <Link to="/">
          <div className="z-10 flex font-bold tracking-widest">
            <h1 className="text-blue-600 text-6xl md:pl-15">B</h1>
            <h1 className={`text-gray-600 mt-4 text-2xl font-bold`}>udgetz</h1>
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
          {/* <div onClick={signInWithGoogle} className="text-blue-950 hidden">
            Google
          </div>
          <div onClick={Logout} className="text-blue-950 hidden">
            SignOut
          </div> */}
        </div>
        {/* <!-- Hamburger Button --> */}
        <button
          onClick={toggleMenu}
          class="z-30 block md:hidden focus:outline-none hamburger"
        >
          <span class="hamburger-top"></span>
          <span class="hamburger-middle"></span>
          <span class="hamburger-bottom"></span>
        </button>
      </div>

      {/* <!-- Mobile Menu --> */}
      <div
        class={`fixed inset-0 z-20 flex-col items-center self-end w-full h-full m-h-screen px-6 py-1 pt-24 pb-4 tracking-widest text-blue-800 uppercase divide-y divide-gray-500 opacity-90 bg-gray-200 transition-all ease-in-out duration-300 ${
          isMenuOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <Link to="/about" onClick={closeMenu}>
          <div class="w-full py-3 text-center">
            <p class="block hover:text-blue-800 hover:font-extrabold">About</p>
          </div>
        </Link>

        <Link to="/features" onClick={closeMenu}>
          <div class="w-full py-3 text-center">
            <p class="block hover:text-blue-800 hover:font-extrabold">
              Features
            </p>
          </div>
        </Link>
        <Link to="/faq" onClick={closeMenu}>
          <div class="w-full py-3 text-center">
            <p class="block hover:text-blue-800 hover:font-extrabold">FaQ</p>
          </div>
        </Link>
        <Link to="/dashboard" onClick={closeMenu}>
          <div class="w-full py-3 text-center">
            <p class="block hover:text-blue-800 hover:font-extrabold">
              Dashboard
            </p>
          </div>
        </Link>
        <Link to="/" onClick={closeMenu}>
          <div class="w-full py-3 text-center">
            <p class="block hover:text-blue-800 hover:font-extrabold">
              Sign In
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
