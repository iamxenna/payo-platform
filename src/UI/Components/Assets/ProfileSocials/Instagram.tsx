import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const Instagram: FC<IAsset> = ({ width = "14", height = "13" }) => (
  <SVGUniqueID>
    <svg width={width} height={height} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.93164 0H3.43164C1.6443 0 0.181641 1.46202 0.181641 3.25V9.75C0.181641 11.5373 1.6443 13 3.43164 13H9.93164C11.719 13 13.1816 11.5373 13.1816 9.75V3.25C13.1816 1.46202 11.719 0 9.93164 0ZM6.68164 9.20823C5.18566 9.20823 3.97325 7.99532 3.97325 6.5C3.97325 5.00402 5.18566 3.79161 6.68164 3.79161C8.17696 3.79161 9.39003 5.00402 9.39003 6.5C9.39003 7.99532 8.17696 9.20823 6.68164 9.20823ZM10.2025 3.79161C9.75337 3.79161 9.39003 3.42777 9.39003 2.97911C9.39003 2.53046 9.75337 2.16661 10.2025 2.16661C10.6517 2.16661 11.015 2.53046 11.015 2.97911C11.015 3.42777 10.6517 3.79161 10.2025 3.79161Z"
        fill="#2C2936"
      />
    </svg>
  </SVGUniqueID>
);
