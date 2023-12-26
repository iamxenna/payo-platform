import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const DollarAsset: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={26} height={25} fill="none">
        <g clipPath="url(#a)">
          <path
            fill="#2D8D00"
            d="M12.625 25c6.904 0 12.5-5.596 12.5-12.5S19.529 0 12.625 0 .125 5.596.125 12.5 5.721 25 12.625 25Z"
          />
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.125 14.324c0 1.183.99 2.136 2.22 2.136h2.51c1.07 0 1.94-.834 1.94-1.86 0-1.12-.53-1.513-1.32-1.77l-4.03-1.283c-.79-.257-1.32-.651-1.32-1.77 0-1.026.87-1.86 1.94-1.86h2.51c1.23 0 2.22.953 2.22 2.136M12 6v12"
          />
        </g>
        <defs>
          <clipPath id="a">
            <rect width={25} height={25} x={0.125} fill="#fff" rx={8} />
          </clipPath>
        </defs>
      </svg>
    </SVGUniqueID>
  );
};
