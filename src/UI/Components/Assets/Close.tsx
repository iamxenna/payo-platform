import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const Close: FC<IAsset> = ({ color }) => (
  <SVGUniqueID>
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.99996 8.99996L1 1M9 1L1 9"
        stroke={color ? color : "#2C2936"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SVGUniqueID>
);
