import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const DangerCircle: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13} fill="none">
        <path fill="#413068" d="M7.188 9.25a.687.687 0 1 1-1.375 0 .687.687 0 0 1 1.375 0Z" />
        <path fill="#413068" d="M7.188 9.25a.687.687 0 1 1-1.375 0 .687.687 0 0 1 1.375 0Z" />
        <path
          stroke="#413068"
          strokeLinecap="round"
          strokeWidth={1.5}
          d="M6.5 3.75v3.3M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z"
        />
      </svg>
    </SVGUniqueID>
  );
};
