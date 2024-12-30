import React, { useState } from "react";

const CopyButton = ({ content }: { content: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
        isCopied ? "bg-green-100 border-green-300 text-green-700" : ""
      }`}
    >
      {/* Copy Icon (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${
          isCopied ? "text-green-600" : "text-gray-600"
        } transition-all duration-300`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2"
        />
      </svg>

      {/* Text */}
      <span>{isCopied ? "Copied!" : "Copy"}</span>
    </button>
  );
};

export default CopyButton;