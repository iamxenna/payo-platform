import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Facebook: FC<IAsset> = () => {
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
            d="M30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0Zm3.127 31.318v16.321h-6.753V31.32H23v-5.625h3.374v-3.377c0-4.588 1.905-7.317 7.317-7.317h4.507v5.625H35.38c-2.107 0-2.246.786-2.246 2.253l-.008 2.815h5.102l-.597 5.625h-4.505Z"
            fill="#040415"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
