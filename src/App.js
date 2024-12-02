import React from "react";
import PictureUploader from "./Components/PictureUploader";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <PictureUploader />
    </div>
    <Footer/>   
    </>
    
  );
};

export default App;
