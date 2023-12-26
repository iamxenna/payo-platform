import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const Facebook: FC<IAsset> = ({ width = "7", height = "13" }) => (
  <SVGUniqueID>
    <svg width={width} height={height} viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.17138 13V6.49924H5.94641L6.18164 4.25904H4.17138L4.17439 3.1378C4.17439 2.55352 4.22931 2.24045 5.0594 2.24045H6.16907V0H4.39379C2.26139 0 1.51084 1.08674 1.51084 2.91429V4.25929H0.181641V6.49949H1.51084V13H4.17138Z"
        fill="#2C2936"
      />
    </svg>
  </SVGUniqueID>
);
