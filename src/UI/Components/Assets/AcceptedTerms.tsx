import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

interface AcceptedTermsProps extends IAsset {
  isNegative?: boolean;
}

export const AcceptedTerms: FC<AcceptedTermsProps> = ({ width, height, isNegative }) => {
  return (
    <SVGUniqueID>
      <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="14" height="14" rx="3" fill={isNegative ? "#F9F6FF" : "#413068"} />
        <path d="M3.5 7L5.5 9.5L11 3.5" stroke={isNegative ? "#413068" : "#F9F6FF"} />
      </svg>
    </SVGUniqueID>
  );
};
