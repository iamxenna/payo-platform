import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const PaginationArrow: FC<IAsset> = ({ color }) => (
  <SVGUniqueID>
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 1L4 4L1 7"
        stroke={color ? color : "#2C2936"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SVGUniqueID>
);
