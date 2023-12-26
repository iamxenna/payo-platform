import React from "react";
import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const MiniArrow: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1L2.76297 2.74731C4.1689 4.14075 4.87187 4.83747 4.98011 5.68667C5.00663 5.89473 5.00663 6.10527 4.98011 6.31333C4.87187 7.16252 4.1689 7.85925 2.76297 9.25269L1 11"
          stroke={color ? color : "#FAFAFA"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
