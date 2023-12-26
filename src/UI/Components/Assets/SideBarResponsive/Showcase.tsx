import React, { FC, useMemo } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Showcase: FC<IAsset & { isMobile: boolean }> = ({ active, isMobile }) => {
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
      <svg width={42} height={42} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.819 18.2v-7.05M13.363 18.2v-7.05m0 0V9.2c0-3.976 3.236-7.2 7.228-7.2 3.992 0 7.228 3.224 7.228 7.2v1.95m-14.456 0c1.422-.15 3.233-.15 5.76-.15h2.935c2.528 0 4.34 0 5.76.15m-14.455 0c-1.087.113-1.947.314-2.724.669a9.024 9.024 0 0 0-3.852 3.341c-1.06 1.657-1.367 3.858-1.981 8.26-.788 5.653-1.182 8.48-.316 10.674a9.01 9.01 0 0 0 3.977 4.55c2.063 1.157 4.928 1.157 10.657 1.157h2.934c5.73 0 8.594 0 10.657-1.157a9.01 9.01 0 0 0 3.977-4.55c.866-2.195.472-5.021-.316-10.674-.614-4.402-.92-6.604-1.981-8.26a9.025 9.025 0 0 0-3.852-3.341c-.777-.355-1.637-.556-2.724-.67"
          stroke={assetColor}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
