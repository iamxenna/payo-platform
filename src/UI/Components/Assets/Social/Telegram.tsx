import React from "react";
import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "../assetTypes";

export const Telegram: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM9.8 17.5C10.0919 17.5 10.2252 17.3701 10.3864 17.2132L10.4 17.2L11.8414 15.7985L14.84 18.0139C15.3919 18.3184 15.7901 18.1607 15.9276 17.5015L17.8961 8.22525C18.0976 7.41723 17.5881 7.05075 17.0602 7.29043L5.50116 11.7475C4.71215 12.064 4.71675 12.5042 5.35734 12.7003L8.32364 13.6262L15.1909 9.29366C15.5151 9.09707 15.8127 9.20276 15.5685 9.4195L10.0043 14.4407L10.0042 14.4407L10.0042 14.4408L10.004 14.441L10.0042 14.4411L9.8 17.5Z"
          fill={color}
        />
      </svg>
    </SVGUniqueID>
  );
};
