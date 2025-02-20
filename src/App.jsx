import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Faq from "./components/Faq";
import Features from "./components/Features";

function App() {
  return (
    <>
      <div className="container relative mx-auto p-6 ">
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/features" element={<Features />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
