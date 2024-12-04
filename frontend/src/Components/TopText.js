import React, { useState, useEffect } from "react";

const TopText = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText =
    "Weelcome to the Image Segmenter Tool! Easily upload and manage your images here.";

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval); // Stop the interval when done
      }
    }, 50); // Adjust speed of text animation

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  return (
    <div className="bg-blue-500 text-white text-center py-4">
      <p className="text-lg font-semibold inline-block">
        {displayText}
        <span className="cursor-blink">|</span>
      </p>
    </div>
  );
};

export default TopText;
