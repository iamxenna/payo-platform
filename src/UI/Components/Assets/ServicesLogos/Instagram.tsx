import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Instagram: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask
          id="a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={60}
          height={60}
        >
          <circle cx={30} cy={30} r={30} fill="#D9D9D9" />
        </mask>
        <g mask="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0ZM12.5 21.25c0-4.814 3.938-8.75 8.75-8.75h17.5c4.812 0 8.75 3.936 8.75 8.75v17.5c0 4.811-3.938 8.75-8.75 8.75h-17.5c-4.812 0-8.75-3.939-8.75-8.75v-17.5ZM22.708 30a7.292 7.292 0 1 0 14.584-.002 7.292 7.292 0 0 0-14.584.001Zm14.584-9.48a2.187 2.187 0 1 0 4.373.001 2.187 2.187 0 0 0-4.373-.001Z"
            fill="#100C1A"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
