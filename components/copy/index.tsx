import React, { useState } from "react";

const CopyButton = ({ content }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center space-x-2 p-2 border rounded"
    >
      {/* Copy Icon SVG */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
      >
        <path
          fill="none"
          d="M0 0h24v24H0z"
        />
        <path
          fill="currentColor"
          d="M18 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H6V4h12v14z"
        />
      </svg>
      <span>{isCopied ? "Copied!" : "Copy"}</span>
    </button>
  );
};

export default CopyButton;
