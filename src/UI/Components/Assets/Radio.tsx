import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Radio: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="none">
        <rect width={26} height={26} rx={13} fill="#413068" />
        <circle cx={13} cy={13} r={3} fill="#fff" />
      </svg>
    </SVGUniqueID>
  );
};
