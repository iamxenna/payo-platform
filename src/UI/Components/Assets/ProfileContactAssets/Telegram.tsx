import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Telegram: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="33" viewBox="0 0 39 33" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.5797 30.5424C15.4708 30.5424 15.8645 30.1348 16.3619 29.6513L21.1145 25.0299L15.1862 21.4551"
          fill="#2C2936"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.185 21.455L29.5497 32.0679C31.1889 32.9723 32.372 32.504 32.7803 30.546L38.6275 2.99184C39.2262 0.591714 37.7126 -0.496872 36.1444 0.215069L1.8098 13.4544C-0.533857 14.3944 -0.520193 15.7019 1.3826 16.2845L10.1936 19.0346L30.5922 6.16543C31.5551 5.58148 32.4389 5.89542 31.7135 6.53922"
          fill="#2C2936"
        />
      </svg>
    </SVGUniqueID>
  );
};
