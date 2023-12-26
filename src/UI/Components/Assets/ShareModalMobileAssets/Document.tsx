import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Document: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="31" viewBox="0 0 27 31" fill="none">
        <path
          d="M2.25 11.6257C2.25 5.16732 4.5 2.58398 10.125 2.58398H15.75"
          stroke="#2C2936"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24.75 12.916V19.3743C24.75 25.8327 22.5 28.416 16.875 28.416H10.125C4.5 28.416 2.25 25.8327 2.25 19.3743V16.7652"
          stroke="#2C2936"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.25 12.9173C16.875 12.9173 15.75 11.6257 15.75 7.75065V2.58398L24.75 12.9173"
          stroke="#2C2936"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
