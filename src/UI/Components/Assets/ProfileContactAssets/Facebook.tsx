import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Facebook: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="36" viewBox="0 0 17 36" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.9043 35.5303V17.7631H15.7557L16.3986 11.6404H10.9043L10.9126 8.57592C10.9126 6.97903 11.0627 6.12338 13.3314 6.12338H16.3643V0H11.5122C5.68416 0 3.63284 2.97016 3.63284 7.96504V11.6411H0V17.7638H3.63284V35.5303H10.9043Z"
          fill="#2C2936"
        />
      </svg>
    </SVGUniqueID>
  );
};
