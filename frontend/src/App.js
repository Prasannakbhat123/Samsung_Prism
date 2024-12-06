import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Added necessary imports
import PictureUploader from "./Components/PictureUploader";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SummaryPage from "./Components/SummaryPage";
import TopText from "./Components/TopText";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Navbar />
        <div className="relative">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Informational Text Section */}
                  <TopText />
                  {/* Picture Uploader */}
                  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <PictureUploader />
                  </div>
                </>
              }
            />
            <Route path="/summary" element={<SummaryPage />} />
          </Routes>
        </div>
        <Footer />
      </>
    </BrowserRouter>
  );
};

export default App;
