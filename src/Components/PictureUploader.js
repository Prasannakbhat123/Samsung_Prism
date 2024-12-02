import React, { useState } from "react";
import { FaFileImage, FaTimes, FaEye } from "react-icons/fa";

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

  const previewFile = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg w-full max-w-3xl mx-auto min-h-screen">

    <div className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-gray-300 rounded-lg w-full max-w-3xl mx-auto">
      {/* Image Above */}
      <img
        src="https://cdn.icon-icons.com/icons2/2570/PNG/512/image_icon_153794.png"
        alt="Sample"
        className="w-32 h-32 mb-4"
      />

      {uploading ? (
        <div className="w-full">
          {/* Uploading text */}
          <p className="text-center text-gray-600 mb-2">Uploading...</p>

          {/* Progress bar */}
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
        <div
          className="flex flex-col items-center justify-center text-center text-gray-500"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="text-lg mb-4 font-medium">Drag and drop an image here</p>
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

      {/* Uploaded files */}
      <div className="mt-6 w-full">
        {uploadedFiles.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border border-gray-300 rounded mb-4"
          >
            <div className="flex items-center space-x-3">
              {/* File icon */}
              <FaFileImage className="text-[#24B1EB] text-xl" />

              <div>
                <p className="text-gray-800 font-medium text-sm">{file.name}</p>
                <p className="text-gray-500 text-xs">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaEye
                className="text-[#24B1EB] text-xl cursor-pointer hover:text-green-700"
                onClick={() => previewFile(file.url)}
              />
              <FaTimes
                className="text-red-400 text-xl cursor-pointer hover:text-red-700"
                onClick={() => deleteFile(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PictureUploader;
