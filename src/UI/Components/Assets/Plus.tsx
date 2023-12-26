import SVGUniqueID from "react-svg-unique-id";
import { FC } from "react";
import { IAsset } from "./assetTypes";

export const Plus: FC<IAsset> = () => (
  <SVGUniqueID>
    <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="4.86377" x2="8.00002" y2="4.86377" stroke="#787580" />
      <line x1="4.13623" y1="0.998835" x2="4.15486" y2="8.99884" stroke="#787580" />
    </svg>
  </SVGUniqueID>
);
