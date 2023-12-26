import React from "react";
import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const Share: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.1875 2L4.5 0.5M4.5 0.5L5.8125 2M4.5 0.5V5.5M2.3126 4C1.9049 4 1.70105 4 1.54025 4.07612C1.32585 4.17761 1.15541 4.37228 1.06661 4.61731C1 4.80108 1 5.03406 1 5.5V7.9C1 8.46005 1 8.7401 1.09537 8.95401C1.17926 9.14218 1.31302 9.29512 1.47766 9.39099C1.66483 9.49998 1.91004 9.5 2.40009 9.5H6.60009C7.09013 9.5 7.33498 9.49998 7.52216 9.39099C7.6868 9.29512 7.82083 9.14218 7.90472 8.95401C8.00009 8.7401 8 8.46005 8 7.9V5.5C8 5.03406 7.99995 4.80108 7.93335 4.61731C7.84454 4.37228 7.67425 4.17761 7.45985 4.07612C7.29905 4 7.0952 4 6.6875 4"
          stroke={color ? color : "#F9F6FF"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
