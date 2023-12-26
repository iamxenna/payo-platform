import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const ArrowRight: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={34} height={34} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx={17} cy={17} r={17} fill="#2C2936" />
        <path
          d="m15 22 1.763-1.747c1.406-1.394 2.109-2.09 2.217-2.94a2.48 2.48 0 0 0 0-.626c-.108-.85-.811-1.546-2.217-2.94L15 12"
          stroke="#CACACC"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
