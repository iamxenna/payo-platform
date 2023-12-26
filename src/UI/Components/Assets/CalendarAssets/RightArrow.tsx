import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const RightArrow: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.289 6.71a.996.996 0 0 0 0 1.41l3.88 3.88-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41l-4.59-4.59c-.38-.38-1.02-.38-1.41.01Z"
          fill="#313233"
        />
      </svg>
    </SVGUniqueID>
  );
};
