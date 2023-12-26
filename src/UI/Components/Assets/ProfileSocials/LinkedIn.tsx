import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const LinkedIn: FC<IAsset> = ({ width = "14", height = "14" }) => (
  <SVGUniqueID>
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.31201 4.28076H0.356445V13.161H3.31201V4.28076Z"
        fill="#2C2936"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.50663 1.53388C3.48745 0.663178 2.86481 0 1.85373 0C0.842649 0 0.181641 0.663178 0.181641 1.53388C0.181641 2.38655 0.823112 3.06882 1.81536 3.06882H1.83425C2.86481 3.06882 3.50663 2.38655 3.50663 1.53388Z"
        fill="#2C2936"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9709 8.06937C13.9709 5.34175 12.5129 4.07227 10.568 4.07227C8.99875 4.07227 8.29619 4.93419 7.90391 5.53884V4.28103H4.948C4.98695 5.1143 4.948 13.1613 4.948 13.1613H7.90391V8.20181C7.90391 7.9364 7.9231 7.67165 8.00124 7.48163C8.21485 6.95142 8.70121 6.40247 9.51774 6.40247C10.5877 6.40247 11.0154 7.21676 11.0154 8.41009V13.161H13.9708L13.9709 8.06937Z"
        fill="#2C2936"
      />
    </svg>
  </SVGUniqueID>
);
