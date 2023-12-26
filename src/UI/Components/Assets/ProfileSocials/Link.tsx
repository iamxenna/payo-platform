import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const Link: FC<IAsset> = ({ width = "14", height = "13" }) => (
  <SVGUniqueID>
    <svg width={width} height={height} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.8157 10.9335C8.12075 10.6533 8.14089 10.1789 7.86068 9.87384C7.58047 9.56879 7.10602 9.54865 6.80097 9.82886L7.8157 10.9335ZM10.8124 6.14414C10.5073 6.42435 10.4872 6.89879 10.7674 7.20384C11.0476 7.50889 11.522 7.52903 11.8271 7.24882L10.8124 6.14414ZM6.20646 1.1299C5.90141 1.41011 5.88127 1.88456 6.16148 2.18961C6.44169 2.49466 6.91613 2.5148 7.22118 2.23459L6.20646 1.1299ZM3.20979 5.91931C3.51484 5.6391 3.53498 5.16466 3.25477 4.85961C2.97456 4.55456 2.50012 4.53442 2.19507 4.81463L3.20979 5.91931ZM4.49802 7.32174C4.19297 7.60195 4.17283 8.0764 4.45304 8.38145C4.73325 8.6865 5.2077 8.70664 5.51275 8.42643L4.49802 7.32174ZM9.52414 4.74171C9.82919 4.4615 9.84932 3.98705 9.56912 3.682C9.28891 3.37695 8.81446 3.35681 8.50941 3.63702L9.52414 4.74171ZM6.80097 9.82886C5.72138 10.8205 4.04228 10.7493 3.05061 9.66968L1.94592 10.6844C3.49802 12.3741 6.12601 12.4856 7.8157 10.9335L6.80097 9.82886ZM10.9715 2.39377C11.9632 3.47337 11.892 5.15246 10.8124 6.14414L11.8271 7.24882C13.5168 5.69673 13.6283 3.06874 12.0762 1.37905L10.9715 2.39377ZM7.22118 2.23459C8.30078 1.24291 9.97987 1.31418 10.9715 2.39377L12.0762 1.37905C10.5241 -0.310647 7.89615 -0.422193 6.20646 1.1299L7.22118 2.23459ZM2.19507 4.81463C0.505374 6.36672 0.393828 8.99471 1.94592 10.6844L3.05061 9.66968C2.05893 8.59008 2.1302 6.91099 3.20979 5.91931L2.19507 4.81463ZM5.51275 8.42643L9.52414 4.74171L8.50941 3.63702L4.49802 7.32174L5.51275 8.42643Z"
        fill="#2C2936"
      />
    </svg>
  </SVGUniqueID>
);
