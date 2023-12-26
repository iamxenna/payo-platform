import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const Arrow: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="10" height="22" viewBox="0 0 10 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 1L5.47406 4.49462C2.66219 7.2815 1.25626 8.67495 1.03978 10.3733C0.986741 10.7895 0.986741 11.2105 1.03978 11.6267C1.25626 13.325 2.66219 14.7185 5.47406 17.5054L9 21"
          stroke={color ? color : "#100C1A"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
