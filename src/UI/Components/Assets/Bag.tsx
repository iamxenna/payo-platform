import React, { FC, useMemo } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

export const Bag: FC<IAsset & { isMobile: boolean }> = ({ active, isMobile }) => {
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
      <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 10.2318V6.31449M6.00003 10.2318V6.31449M6.00003 6.31449V5.23181C6.00003 3.02267 7.79089 1.23181 10 1.23181C12.2092 1.23181 14 3.02267 14 5.23181V6.31449M6.00003 6.31449C6.78675 6.23181 7.78926 6.23181 9.18794 6.23181H10.8121C12.2108 6.23181 13.2133 6.23181 14 6.31449M6.00003 6.31449C5.39798 6.37777 4.92231 6.48947 4.49219 6.68664C3.6179 7.08744 2.87775 7.73189 2.36049 8.54274C1.77349 9.4629 1.60366 10.6857 1.264 13.1313C0.827825 16.2717 0.609738 17.8419 1.08927 19.0615C1.51024 20.1321 2.28753 21.0248 3.29007 21.5891C4.43205 22.2318 6.01734 22.2318 9.18794 22.2318H10.8121C13.9827 22.2318 15.568 22.2318 16.71 21.5891C17.7125 21.0248 18.4898 20.1321 18.9108 19.0615C19.3903 17.8419 19.1722 16.2717 18.7361 13.1313C18.3964 10.6857 18.2266 9.4629 17.6396 8.54274C17.1223 7.73189 16.3822 7.08744 15.5079 6.68664C15.0778 6.48947 14.6021 6.37777 14 6.31449"
          stroke={assetColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
