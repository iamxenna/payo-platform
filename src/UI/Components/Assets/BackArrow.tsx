import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const BackArrow: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={43} height={27} fill="none">
        <path
          d="M41.375 13.5H1.625m0 0L12.667 24.54M1.625 13.5 12.667 2.458"
          stroke="#413068"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
