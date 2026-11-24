import React from 'react';

export default function LotusLogo({ className = "w-8 h-8", color = "#E77A57" }) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        {/* Central Lotus Petal */}
        <path
          d="M20 5C20 5 26 14 26 21C26 24.31 23.31 27 20 27C16.69 27 14 24.31 14 21C14 14 20 5 20 5Z"
          fill={color}
          opacity="0.95"
        />
        {/* Left Petal */}
        <path
          d="M20 27C16.5 27 9 26 6 21C3.5 16.5 7 13 10 14.5C13 16 16.5 20.5 20 27Z"
          fill={color}
          opacity="0.8"
        />
        {/* Right Petal */}
        <path
          d="M20 27C23.5 27 31 26 34 21C36.5 16.5 33 13 30 14.5C27 16 23.5 20.5 20 27Z"
          fill={color}
          opacity="0.8"
        />
        {/* Outer Gentle Base Leaves */}
        <path
          d="M11 27C8 28.5 4 30.5 5 33C6 35.5 10 35 14 33C17 31.5 19 28.5 20 27C16 27 13 26 11 27Z"
          fill={color}
          opacity="0.65"
        />
        <path
          d="M29 27C32 28.5 36 30.5 35 33C34 35.5 30 35 26 33C23 31.5 21 28.5 20 27C24 27 27 26 29 27Z"
          fill={color}
          opacity="0.65"
        />
        {/* Center Golden Core Dew */}
        <circle cx="20" cy="20" r="2.5" fill="#FFF4D0" opacity="0.9" />
      </svg>
    </div>
  );
}
