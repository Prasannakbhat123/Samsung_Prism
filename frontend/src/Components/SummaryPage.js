import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMousePointer, FaEraser } from "react-icons/fa";
import sampleOutput from '../assets/sampleOutput.jpg';


const SummaryPage = () => {
  const location = useLocation();
  const { uploadedFiles } = location.state || { uploadedFiles: [] };
  const [selectedTool, setSelectedTool] = useState("cursor"); // Default tool is "cursor"
  const [dots, setDots] = useState([]); // To store the coordinates of red dots
  const [isProcessing, setIsProcessing] = useState(false); // For loading screen visibility
  const [outputImage, setOutputImage] = useState(null); // For output image after processing
  const [selectedFileName, setSelectedFileName] = useState(""); // To store the selected file name

  // Handle the click event to add a red dot and log coordinates
  const handleImageClick = (e, file) => {
    if (selectedTool === "cursor") {
      const bounds = e.target.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      // Store the coordinates of the red dot
      setDots((prevDots) => [...prevDots, { x, y, fileName: file.name }]);
      console.log(`Coordinates: x: ${x}, y: ${y}`);
    }
  };

  // Handle the "Process" button click
  const handleProcessClick = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOutputImage(sampleOutput); // Replace with actual output image path
    }, 10000); // 10 seconds delay
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Loading Screen */}
      {isProcessing && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
          <div className="flex gap-x-2 justify-center items-center">
            <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-pulse animate-bounce"></div>
            <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-pulse animate-bounce"></div>
            <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-pulse animate-bounce"></div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-16 bg-gray-200 text-gray-700 flex flex-col items-center py-4">
        {/* Cursor Tool */}
        <div className="relative mb-4 w-full">
          <button
            className={`py-3 px-4 rounded-lg flex items-center justify-center mx-auto  ${
              selectedTool === "cursor" ? "bg-blue-500 text-white" : "hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTool("cursor")}
          >
            <FaMousePointer />
          </button>
        </div>

        {/* Eraser Tool */}
        <div className="relative w-full">
          <button
            className={`py-3 px-4 rounded-lg flex items-center justify-center mx-auto ${
              selectedTool === "eraser" ? "bg-blue-500 text-white" : "hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTool("eraser")}
          >
            <FaEraser />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Uploaded Images</h1>
          <div
            className={`grid gap-4 ${
              uploadedFiles.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`relative ${
                  uploadedFiles.length === 1
                    ? "flex flex-col justify-center items-center"
                    : ""
                }`}
              >
                {/* Image name on top of the image */}
                <div className="text-center mb-2">
                  <p
                    className={`text-sm ${
                      uploadedFiles.length === 1
                        ? "text-white bg-black bg-opacity-50 px-2 py-1 rounded"
                        : "text-center"
                    }`}
                  >
                    {file.name}
                  </p>
                </div>

                <div
                  className={`relative w-full ${
                    uploadedFiles.length === 1
                      ? "h-[calc(100vh-80px)] object-contain"
                      : "h-80 object-cover"
                  }`}
                  onClick={(e) => handleImageClick(e, file)}
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full rounded-lg border border-gray-300 object-cover"
                  />
                  {/* Render red dots */}
                  {dots
                    .filter((dot) => dot.fileName === file.name)
                    .map((dot, index) => (
                      <div
                        key={index}
                        className="absolute bg-red-500 rounded-full"
                        style={{
                          left: `${dot.x - 5}px`, // Adjust for dot size
                          top: `${dot.y - 5}px`, // Adjust for dot size
                          width: "8px",
                          height: "8px",
                        }}
                      ></div>
                    ))}
                </div>

                {/* Process Button (only shows after a dot is selected) */}
                {dots.some((dot) => dot.fileName === file.name) && (
                  <div className="mt-4 w-full text-center">
                    <button
                      className="py-2 px-6 bg-blue-500 text-white rounded"
                      onClick={() => {
                        setSelectedFileName(file.name); // Store file name for processing
                        handleProcessClick();
                      }}
                    >
                      Process
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Output Image after processing */}
          {outputImage && (
            <div className="mt-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Segmented Image</h2>
              <img src={outputImage} alt="Segmented Output" className="w-full max-w-2xl mx-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
