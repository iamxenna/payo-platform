import React from "react";
import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const Documents: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.25 5.625C1.25 2.5 2.5 1.25 5.625 1.25H8.75"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 6.25V9.375C13.75 12.5 12.5 13.75 9.375 13.75H5.625C2.5 13.75 1.25 12.5 1.25 9.375V8.1125"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.25 6.25C9.375 6.25 8.75 5.625 8.75 3.75V1.25L13.75 6.25"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
