import React from "react";

export const WebhookIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular Nodes */}
      <circle cx="6" cy="12" r="3" fill="#4CAF50" />
      <circle cx="18" cy="6" r="3" fill="#2196F3" />
      <circle cx="18" cy="18" r="3" fill="#FF9800" />
      {/* Connecting Paths */}
      <path
        d="M8 12C8 10.5 9 9 12 9C15 9 16 10.5 16 12C16 13.5 15 15 12 15C9 15 8 13.5 8 12Z"
        stroke="#969696"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M18 18C17 17 15 16 12 16"
        stroke="#969696"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 8C15 8 17 7 18 6"
        stroke="#969696"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
