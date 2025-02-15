import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <>
    <div className="container relative mx-auto p-6">
    <Navbar />
      <Routes>
        <Route path="/" element ={<Homepage/>}/>
      </Routes>
      <Footer/>

      

    </div>
      
      
    </>
  );
}

export default App;
