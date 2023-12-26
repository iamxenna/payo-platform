import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const BackMobileArrow: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={23} height={47} fill="none">
        <path
          d="m19.593 3.115-7.313 6.99c-5.832 5.573-8.748 8.36-9.197 11.757a9.56 9.56 0 0 0 0 2.507c.449 3.396 3.365 6.183 9.197 11.757l7.313 6.99"
          stroke="#100C1A"
          strokeWidth={6}
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
