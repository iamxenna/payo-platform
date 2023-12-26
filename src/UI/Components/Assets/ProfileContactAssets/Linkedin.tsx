import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Linkedin: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="36" viewBox="0 0 38 36" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.55563 11.7012H0.477783V35.9717H8.55563V11.7012Z"
          fill="#2C2936"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.08753 4.19224C9.0351 1.81253 7.33336 0 4.56998 0C1.8066 0 0 1.81253 0 4.19224C0 6.52267 1.7532 8.38739 4.46512 8.38739H4.51675C7.33336 8.38739 9.08753 6.52267 9.08753 4.19224Z"
          fill="#2C2936"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M37.6875 22.0534C37.6875 14.5985 33.7024 11.1289 28.3868 11.1289C24.098 11.1289 22.1778 13.4846 21.1057 15.1372V11.6995H13.0269C13.1334 13.9769 13.0269 35.97 13.0269 35.97H21.1057V22.4153C21.1057 21.69 21.1582 20.9664 21.3717 20.447C21.9555 18.9979 23.2848 17.4976 25.5165 17.4976C28.4407 17.4976 29.6096 19.7231 29.6096 22.9846V35.9694H37.6871L37.6875 22.0534Z"
          fill="#2C2936"
        />
      </svg>
    </SVGUniqueID>
  );
};
