import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const Telegram: FC<IAsset> = ({ width = "15", height = "12" }) => (
  <SVGUniqueID>
    <svg width={width} height={height} viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.51599 11.1745C5.84204 11.1745 5.98609 11.0254 6.16808 10.8485L7.90699 9.1576L5.73792 7.84961"
        fill="#2C2936"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.73759 7.85006L10.9934 11.7332C11.5932 12.0641 12.0261 11.8927 12.1755 11.1763L14.3149 1.09467C14.5339 0.216499 13.9801 -0.181798 13.4064 0.0786907L0.843821 4.92275C-0.0136896 5.26669 -0.00869025 5.7451 0.687515 5.95827L3.91134 6.96448L11.3749 2.25584C11.7272 2.04218 12.0506 2.15705 11.7851 2.3926"
        fill="#2C2936"
      />
    </svg>
  </SVGUniqueID>
);
