import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Telegram: FC<IAsset> = () => {
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
            d="M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30Zm-5.5-16.25c.73 0 1.063-.325 1.466-.717L26 43l3.603-3.504 7.497 5.539c1.38.761 2.375.367 2.719-1.281l4.921-23.19c.504-2.02-.77-2.937-2.09-2.338L13.753 29.37c-1.973.791-1.961 1.892-.36 2.382l7.416 2.314 17.168-10.83c.81-.492 1.555-.228.944.314l-13.91 12.553h-.001l-.51 7.648Z"
            fill="#100C1A"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
