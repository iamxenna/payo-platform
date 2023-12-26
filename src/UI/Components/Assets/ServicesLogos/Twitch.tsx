import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Twitch: FC<IAsset> = () => {
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
        <g mask="url(#a)" fillRule="evenodd" clipRule="evenodd" fill="#040415">
          <path d="M60 30c0 16.569-13.431 30-30 30C13.431 60 0 46.569 0 30 0 13.431 13.431 0 30 0c16.569 0 30 13.431 30 30Zm-46.934-9.739L15.414 14h32.08v21.915l-9.39 9.387h-7.042L26.368 50h-4.697v-4.698h-8.605V20.261Z" />
          <path d="M18.542 17.129h25.823v17.217l-5.479 5.48H30.28l-4.692 4.691v-4.692h-7.046V17.13Zm8.608 15.654h3.13v-9.39h-3.13v9.39Zm11.736 0h-3.13v-9.39h3.13v9.39Z" />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
