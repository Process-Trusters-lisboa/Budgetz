import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Homepage from "./pages/Homepage"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element ={<Homepage/>}/>
      </Routes>
      <Footer/>

      
      
    </>
  );
}

export default App;
