import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";

export const BigArrow: FC = () => {
  return (
    <SVGUniqueID>
      <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 1L8 8L1 1" stroke="#100C1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </SVGUniqueID>
  );
};
