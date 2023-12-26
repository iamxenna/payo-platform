import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const ResponsiveLogo: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={28} height={39} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.998 7.033V3.516L9.201 6.32C3.664 9.554.248 15.575.248 22.096c0 0 .027 3.53.08 4.03.75 7.148 6.741 12.696 13.971 12.54 7.518-.164 13.453-6.616 13.453-14.306V0l-13.75 7.03-.004.003Zm0 27.476c-5.233 0-9.476-4.264-9.476-9.523 0-5.259 4.243-9.523 9.476-9.523 5.233 0 9.476 4.264 9.476 9.523 0 5.259-4.243 9.523-9.476 9.523Z"
          fill="#F9F6FF"
        />
      </svg>
    </SVGUniqueID>
  );
};
