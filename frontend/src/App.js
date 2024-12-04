import React from "react";
import PictureUploader from "./Components/PictureUploader";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import TopText from "./Components/TopText";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="relative">
        {/* Informational Text Section */}
        <TopText/>
        {/* Picture Uploader */}
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <PictureUploader />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
