import React, { FC, useMemo } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Partnership: FC<IAsset & { isMobile: boolean }> = ({ active, isMobile }) => {
  const assetColor = useMemo(() => {
    if (active && isMobile) {
      return "#413068";
    } else if (!active && isMobile) {
      return "#2C2936";
    } else if (active && !isMobile) {
      return "#C7ADFF";
    }
    return "#F9F6FF";
  }, [isMobile, active]);
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={55} height={54} fill="none">
        <path
          d="M48.125 44.834c0-3.991-3.826-7.387-9.167-8.645m-4.583 8.645c0-5.063-6.156-9.167-13.75-9.167s-13.75 4.104-13.75 9.167m27.5-16.042a9.167 9.167 0 1 0 0-18.333m-13.75 18.333a9.167 9.167 0 1 1 0-18.333 9.167 9.167 0 0 1 0 18.333Z"
          stroke={assetColor}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
