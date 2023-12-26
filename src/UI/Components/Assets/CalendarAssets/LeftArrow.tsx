import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const LeftArrow: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.71 6.71a.996.996 0 0 0-1.41 0L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41Z"
          fill="#313233"
        />
      </svg>
    </SVGUniqueID>
  );
};
