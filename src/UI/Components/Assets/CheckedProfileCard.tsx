import React from "react";
import SVGUniqueID from "react-svg-unique-id";

export const CheckedProfileCard = () => (
  <SVGUniqueID>
    <svg width="90" height="89" viewBox="0 0 90 89" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_3559_26075)">
        <circle cx="45" cy="31" r="21" fill="#2A7B32" />
      </g>
      <path
        d="M36.1935 30.6614L42.0647 36.4194L53.8064 24.9033"
        stroke="white"
        strokeWidth="3.3871"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_3559_26075"
          x="0.967741"
          y="0.516129"
          width="88.0645"
          height="88.0645"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="13.5484" />
          <feGaussianBlur stdDeviation="11.5161" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.333333 0 0 0 0 0.321569 0 0 0 0 0.372549 0 0 0 0.06 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3559_26075" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3559_26075" result="shape" />
        </filter>
      </defs>
    </svg>
  </SVGUniqueID>
);
