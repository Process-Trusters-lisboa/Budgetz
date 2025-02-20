import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase'; 
import { signInWithPopup, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';  


function Navbar() {

   //firebase google authentication
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
  

    //googleSignIn and Navigate to Homepage.
    
    const signInWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);  
        const currentUser = result.user;  
        setUser(currentUser); 
        console.log('Signed in as', currentUser.displayName);
  
        navigate('/dashboard');
        
        
      } catch (e) {
        console.log('Failed to sign in with Google', e);
      }       
    };
  
    const Logout = async () => {
      try {
        await signOut(auth); 
        navigate('/');
      }
      catch (e) {
          console.log('Failed to sign in with Google', e);
        }       
  };


  return (
    <div>
      {/* navbar container */}
      <div className="flex items-center justify-between space-x-20 my-6">
        {/* navbar logo */}
        <Link to="/">
          <div className="z-10 flex font-bold tracking-widest">
            
            <h1 className="text-blue-600 text-6xl">B</h1>
            <h1 className="text-gray-600 mt-4 text-2xl">udgetz</h1>
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
          <div onClick={signInWithGoogle} className="text-blue-950">
            Google
          </div>
          <div onClick={Logout} className="text-blue-950">
            SignOut
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
