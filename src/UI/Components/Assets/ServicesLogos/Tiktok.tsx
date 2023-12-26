import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Tiktok: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg width={60} height={60} fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask
          id="a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={60}
          height={60}
        >
          <circle cx={30} cy={30} r={30} fill="#D9D9D9" />
        </mask>
        <g mask="url(#a)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0Zm6.772 24.196A13.904 13.904 0 0 0 45 26.888V20.87c-1.652 0-3.19-.5-4.48-1.356a8.394 8.394 0 0 1-3.609-5.489 8.523 8.523 0 0 1-.14-1.527h-5.914l-.01 24.115c-.099 2.7-2.283 4.868-4.961 4.868a4.87 4.87 0 0 1-2.306-.581 5.072 5.072 0 0 1-2.666-4.477c0-2.79 2.23-5.058 4.972-5.058.512 0 1.003.086 1.467.234v-6.143c-.48-.067-.969-.109-1.467-.109C19.883 25.348 15 30.317 15 36.424c0 3.747 1.84 7.063 4.647 9.068a10.696 10.696 0 0 0 6.239 2.007c6.002 0 10.886-4.968 10.886-11.075V24.196Z"
            fill="#100C1A"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};
