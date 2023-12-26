import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const DotsAsset: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={41} height={9} fill="none">
        <circle cx={4.016} cy={4.016} r={4.016} transform="matrix(-.00205 1 1 .00205 .016 0)" fill="#413068" />
        <circle cx={4.016} cy={4.016} r={4.016} transform="matrix(-.00205 1 1 .00205 16.079 .035)" fill="#413068" />
        <circle cx={4.016} cy={4.016} r={4.016} transform="matrix(-.00205 1 1 .00205 32.141 .066)" fill="#413068" />
      </svg>
    </SVGUniqueID>
  );
};
