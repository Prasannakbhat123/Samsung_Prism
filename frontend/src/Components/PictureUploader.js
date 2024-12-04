import React, { useState } from "react";
import {FaTimes} from "react-icons/fa";

const PictureUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setUploading(true);
      setProgress(0);

      const uploadInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setUploading(false);

            const newFiles = files.map((file) => ({
              name: file.name,
              size: (file.size / 1024).toFixed(2) + " KB",
              url: URL.createObjectURL(file),
            }));

            setUploadedFiles((prevFiles) => {
              const existingNames = new Set(prevFiles.map((file) => file.name));
              const filteredFiles = newFiles.filter(
                (file) => !existingNames.has(file.name)
              );
              return [...prevFiles, ...filteredFiles];
            });
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleImageChange({ target: { files } });
    }
  };

  const deleteFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg w-full max-w-3xl mx-auto min-h-screen">
      <div
        className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-300 rounded-lg w-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="w-full">
            <p className="text-center text-gray-600 mb-2">Uploading...</p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">{progress}%</span>
              <div className="relative w-full h-2 bg-gray-300 rounded">
                <div
                  className="absolute top-0 left-0 h-2 bg-[#24B1EB] rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4 font-medium">Drag and drop the images here</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
              multiple
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-[#104384] text-white px-10 py-2 rounded-full hover:bg-[#293a52]"
            >
              Browse
            </label>
          </div>
        )}
      </div>

      {/* Display uploaded images */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
              onClick={() => deleteFile(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureUploader;
