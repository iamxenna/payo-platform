import React, { FC, useMemo } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const User: FC<IAsset & { isMobile: boolean }> = ({ active, isMobile }) => {
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
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 20.2317C21 18.4901 19.3304 17.0085 17 16.4594M15 20.2318C15 18.0227 12.3137 16.2318 9 16.2318C5.68629 16.2318 3 18.0227 3 20.2318M15 13.2318C17.2091 13.2318 19 11.441 19 9.23181C19 7.02267 17.2091 5.23181 15 5.23181M9 13.2318C6.79086 13.2318 5 11.441 5 9.23181C5 7.02267 6.79086 5.23181 9 5.23181C11.2091 5.23181 13 7.02267 13 9.23181C13 11.441 11.2091 13.2318 9 13.2318Z"
          stroke={assetColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
