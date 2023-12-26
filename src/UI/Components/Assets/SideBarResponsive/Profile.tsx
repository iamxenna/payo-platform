import React, { FC, useMemo } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Profile: FC<IAsset & { isMobile: boolean }> = ({ active, isMobile }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" width={42} height={43} fill="none">
        <g clipPath="url(#a)">
          <path
            stroke={assetColor}
            d="M29.857 13.947c0 4.957-3.98 8.948-8.857 8.948v4c7.116 0 12.857-5.813 12.857-12.948h-4ZM21 22.895c-4.876 0-8.857-3.99-8.857-8.948h-4c0 7.135 5.74 12.948 12.857 12.948v-4Zm-8.857-8.948C12.143 8.99 16.123 5 21 5V1C13.884 1 8.143 6.812 8.143 13.947h4ZM21 5c4.876 0 8.857 3.99 8.857 8.947h4C33.857 6.812 28.117 1 21 1v4Zm-8.143 30.105h16.286v-4H12.857v4ZM29.143 53H12.857v4h16.286v-4Zm-16.286 0C7.981 53 4 49.01 4 44.053H0C0 51.188 5.74 57 12.857 57v-4ZM38 44.053C38 49.01 34.019 53 29.143 53v4C36.259 57 42 51.188 42 44.053h-4Zm-8.857-8.948c4.876 0 8.857 3.99 8.857 8.948h4c0-7.135-5.74-12.948-12.857-12.948v4Zm-16.286-4C5.741 31.105 0 36.918 0 44.053h4c0-4.957 3.981-8.948 8.857-8.948v-4Z"
            fill="#2C2936"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" transform="translate(0 .5)" d="M0 0h42v42H0z" />
          </clipPath>
        </defs>
      </svg>
    </SVGUniqueID>
  );
};
