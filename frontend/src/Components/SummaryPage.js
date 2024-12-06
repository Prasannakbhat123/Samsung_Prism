import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMousePointer, FaEraser } from "react-icons/fa";

const SummaryPage = () => {
  const location = useLocation();
  const { uploadedFiles } = location.state || { uploadedFiles: [] };
  const [selectedTool, setSelectedTool] = useState("cursor"); // Default tool is "cursor"
  const [dots, setDots] = useState([]); // To store the coordinates of red dots

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-16 bg-gray-200 text-gray-700 flex flex-col items-center py-4">
        {/* Cursor Tool */}
        <div className="relative mb-4 w-full">
          <button
            className={`py-3 px-4 rounded-lg flex items-center justify-center mx-auto  ${
              selectedTool === "cursor"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-300"
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
              selectedTool === "eraser"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-300"
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
              uploadedFiles.length === 1
                ? "grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className={`relative ${
                  uploadedFiles.length === 1
                    ? "flex justify-center items-center"
                    : ""
                }`}
              >
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
                <p
                  className={`text-sm mt-2 ${
                    uploadedFiles.length === 1
                      ? "absolute bottom-4 text-center text-white bg-black bg-opacity-50 px-2 py-1 rounded"
                      : "text-center"
                  }`}
                >
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
