import React, { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "Components/Assets/assetTypes";

export const Share: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width={11} height={13} fill="none">
        <path
          d="m4.096 3.017 1.527-1.865m0 0L7.15 3.017M5.623 1.152V7.37M3.078 5.504c-.474 0-.711 0-.899.095-.249.126-.447.368-.55.673-.078.228-.078.518-.078 1.097v2.984c0 .697 0 1.045.11 1.31.098.235.254.425.446.544.217.136.503.136 1.073.136h4.887c.57 0 .855 0 1.073-.136.191-.119.347-.31.445-.543.11-.266.11-.614.11-1.31V7.368c0-.58 0-.869-.077-1.097a1.156 1.156 0 0 0-.55-.673c-.188-.095-.425-.095-.9-.095"
          stroke="#fff"
          strokeWidth={1.199}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SVGUniqueID>
  );
};
