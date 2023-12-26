import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const ExportBackArrow: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={19} height={34} fill="none">
        <path
          d="M14.2 3 9.264 7.718c-3.937 3.762-5.905 5.643-6.208 7.936a6.454 6.454 0 0 0 0 1.692c.303 2.293 2.271 4.174 6.208 7.936L14.2 30"
          stroke="#2C2936"
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
