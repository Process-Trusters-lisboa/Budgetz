import React from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from '../components/Dashboard'
import Hero from '../pages/Hero'


function Homepage() {
  return (
    <>
    <div className="container relative mx-auto flex items-center justify-center h-screen flex-grow">
    <Hero />
    </div>

    </>
  )
}

export default Homepage