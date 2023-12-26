import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Linkedin: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask
          id="a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={60}
          height={60}
        >
          <circle cx={30} cy={30} r={30} fill="#D9D9D9" />
        </mask>
        <g mask="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0ZM14.402 24.847h6.799v20.428h-6.799V24.847Zm7.246-6.319C21.604 16.526 20.172 15 17.846 15 15.521 15 14 16.526 14 18.528c0 1.962 1.476 3.531 3.758 3.531h.044c2.37 0 3.846-1.57 3.846-3.53Zm16.243 5.84c4.474 0 7.828 2.92 7.828 9.194v11.713h-6.798v-10.93c0-2.744-.984-4.617-3.445-4.617-1.879 0-2.997 1.262-3.489 2.482-.18.437-.224 1.046-.224 1.657v11.408h-6.8s.09-18.51 0-20.427h6.8v2.893c.903-1.39 2.519-3.373 6.128-3.373Z"
            fill="#100C1A"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
