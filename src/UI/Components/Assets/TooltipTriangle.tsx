import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const TooltipTriangle: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={54} height={18} fill="none">
        <g clipPath="url(#a)">
          <mask
            id="b"
            width={23}
            height={21}
            x={16}
            y={-1}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "alpha",
            }}
          >
            <path fill="#C4C4C4" d="M38.068 19.103 27.034-.007l-11.033 19.11h22.067Z" />
          </mask>
          <g mask="url(#b)">
            <path fill="#fff" d="M44.795 30.755 27.035-.008 9.272 30.755h35.522Z" />
          </g>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M54 18H0V0h54z" />
          </clipPath>
        </defs>
      </svg>
    </SVGUniqueID>
  );
};
