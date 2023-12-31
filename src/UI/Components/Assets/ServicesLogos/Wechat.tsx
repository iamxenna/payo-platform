import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Wechat: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx={30} cy={30} r={30} fill="#100C1A" />
        <path
          d="M25.091 13.053c-8.042 0-14.56 5.434-14.56 12.134 0 3.864 2.179 7.29 5.56 9.509l-1.92 3.84 5.23-2.24c1.12.397 2.286.725 3.53.878-.17-.74-.266-1.5-.266-2.28 0-6.69 6.53-12.133 14.56-12.133.736 0 1.455.06 2.163.148-1.281-5.611-7.19-9.856-14.296-9.856Zm-4.853 9.1a1.82 1.82 0 1 1 .001-3.64 1.82 1.82 0 0 1-.001 3.64Zm9.707 0a1.82 1.82 0 1 1 .002-3.64 1.82 1.82 0 0 1-.002 3.64Z"
          fill="#F9F6FF"
        />
        <path
          d="M49.36 34.895c0-5.361-5.434-9.708-12.134-9.708S25.09 29.534 25.09 34.895c0 5.36 5.434 9.707 12.135 9.707 1.102 0 2.15-.155 3.167-.376l6.54 2.803-2.262-4.521c2.835-1.777 4.69-4.51 4.69-7.613Zm-15.775-.607a1.82 1.82 0 1 1 .002-3.642 1.82 1.82 0 0 1-.002 3.642Zm7.281 0a1.82 1.82 0 1 1 .001-3.642 1.82 1.82 0 0 1-.001 3.642Z"
          fill="#F9F6FF"
        />
      </svg>
    </SVGUniqueID>
  );
};
