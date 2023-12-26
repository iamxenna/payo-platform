import SVGUniqueID from "react-svg-unique-id";
import { FC } from "react";
import { IAsset } from "./assetTypes";

export const Minus: FC<IAsset> = () => (
  <SVGUniqueID>
    <svg width="11" height="1" viewBox="0 0 11 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="0.5" x2="11" y2="0.5" stroke="#787580" />
    </svg>
  </SVGUniqueID>
);
