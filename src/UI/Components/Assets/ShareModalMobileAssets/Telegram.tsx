import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Telegram: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M29.28 58.56C45.4509 58.56 58.56 45.4509 58.56 29.28C58.56 13.1091 45.4509 0 29.28 0C13.1091 0 0 13.1091 0 29.28C0 45.4509 13.1091 58.56 29.28 58.56ZM23.9121 42.7017C24.6242 42.7017 24.9497 42.3849 25.343 42.0019L25.3761 41.9697L28.8929 38.5501L36.2095 43.9557C37.556 44.6986 38.5279 44.314 38.8633 42.7055L43.6664 20.0714C44.1582 18.0998 42.9149 17.2056 41.6267 17.7904L13.4228 28.6657C11.4976 29.4379 11.5088 30.512 13.0718 30.9906L20.3096 33.2496L37.0658 22.6783C37.8568 22.1986 38.5828 22.4565 37.987 22.9853L24.4105 35.2371L24.4104 35.237L24.4103 35.2372L24.4097 35.2378L24.4103 35.2382L23.9121 42.7017Z"
          fill="#100C1A"
        />
      </svg>
    </SVGUniqueID>
  );
};
