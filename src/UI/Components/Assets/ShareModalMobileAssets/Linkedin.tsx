import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Linkedin: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="59" viewBox="0 0 60 59" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.0808 0.439453C13.9099 0.439453 0.800781 13.5486 0.800781 29.7194C0.800781 45.8903 13.9099 58.9994 30.0808 58.9994C46.2517 58.9994 59.3608 45.8903 59.3608 29.7194C59.3608 13.5486 46.2517 0.439453 30.0808 0.439453ZM14.8571 24.6917H21.4926V44.6286H14.8571V24.6917ZM21.9296 18.5231C21.8865 16.5683 20.4887 15.0794 18.2187 15.0794C15.9487 15.0794 14.4647 16.5683 14.4647 18.5231C14.4647 20.4374 15.9049 21.9692 18.1326 21.9692H18.175C20.4887 21.9692 21.9296 20.4374 21.9296 18.5231ZM37.7828 24.2199C42.1492 24.2199 45.4227 27.07 45.4227 33.1938L45.4224 44.625H38.7872V33.9587C38.7872 31.2796 37.827 29.4514 35.4249 29.4514C33.5918 29.4514 32.4998 30.6839 32.0203 31.8742C31.8448 32.3008 31.8018 32.8952 31.8018 33.4911V44.6255H25.1655C25.1655 44.6255 25.2529 26.5594 25.1655 24.6886H31.8018V27.5125C32.6824 26.155 34.2598 24.2199 37.7828 24.2199Z"
          fill="#100C1A"
        />
      </svg>
    </SVGUniqueID>
  );
};
