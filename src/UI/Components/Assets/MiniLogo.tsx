import React from "react";
import { FC } from "react";
import SVGUniqueID from "react-svg-unique-id";
import { IAsset } from "./assetTypes";

const MiniLogo: FC<IAsset> = ({ color }) => {
  return (
    <SVGUniqueID>
      <svg width="25" height="11" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.90691 2.29822C2.45696 2.29822 2.04252 2.39938 1.67589 2.59797C1.42375 2.73484 1.18972 2.92005 0.977422 3.15063V2.43657H0V10.1008H0.977422V7.44839C1.20276 7.67302 1.44693 7.85302 1.70777 7.98616C2.07729 8.17435 2.48739 8.26956 2.92575 8.26956C3.70609 8.26956 4.3821 7.97501 4.93421 7.39409C5.48487 6.81391 5.76454 6.09911 5.76454 5.26901C5.76454 4.43891 5.48269 3.7494 4.92624 3.17071C4.36978 2.59202 3.69015 2.29822 2.90691 2.29822ZM4.7777 5.29133C4.7777 5.64166 4.68858 5.98233 4.51324 6.30291C4.3379 6.6235 4.10025 6.87565 3.80608 7.05342C3.51191 7.23119 3.19383 7.32119 2.86054 7.32119C2.52724 7.32119 2.19105 7.23119 1.88384 7.05416C1.57808 6.87788 1.34042 6.63689 1.17667 6.33787C1.0122 6.03663 0.928877 5.6915 0.928877 5.31141C0.928877 4.72528 1.11074 4.24999 1.48461 3.858C1.85775 3.46675 2.3048 3.27708 2.85112 3.27708C3.19745 3.27708 3.52133 3.36559 3.81405 3.54039C4.10604 3.71518 4.34225 3.96436 4.51542 4.28048C4.68931 4.59809 4.7777 4.93876 4.7777 5.29207V5.29133Z"
          fill={color ? color : "#100C1A"}
        />
        <path
          d="M11.3117 3.14841C11.1008 2.91857 10.8675 2.7341 10.6147 2.59724C10.2459 2.3979 9.82852 2.29749 9.37567 2.29749C8.59171 2.29749 7.91135 2.59129 7.35417 3.16998C6.79771 3.74867 6.51514 4.45455 6.51514 5.26828C6.51514 6.08201 6.79481 6.81318 7.3462 7.39336C7.89903 7.97427 8.57504 8.26882 9.35611 8.26882C9.79519 8.26882 10.206 8.17362 10.5777 7.98543C10.84 7.85303 11.0856 7.67228 11.3117 7.44691V8.12973H12.279V2.43509H11.3117V3.14692V3.14841ZM10.7987 3.85726C11.1733 4.24925 11.3552 4.72455 11.3552 5.31068C11.3552 5.69076 11.2718 6.03589 11.1074 6.33714C10.9436 6.6369 10.7067 6.87789 10.4016 7.05417C10.0952 7.2312 9.76693 7.32121 9.42639 7.32121C9.08585 7.32121 8.76922 7.2312 8.47505 7.05343C8.18016 6.87566 7.94251 6.62276 7.76716 6.30292C7.59182 5.98234 7.5027 5.64167 7.5027 5.29134C7.5027 4.941 7.5911 4.59736 7.76499 4.27975C7.93888 3.96288 8.17509 3.71371 8.46781 3.53965C8.76053 3.36486 9.08513 3.27634 9.43219 3.27634C9.97923 3.27634 10.4263 3.46676 10.8001 3.85726H10.7987Z"
          fill={color ? color : "#100C1A"}
        />
        <path
          d="M17.4016 2.4364L15.7481 6.35258L14.0462 2.4364H13.0021L15.2221 7.56872L14.1469 10.1007H15.1895L18.45 2.4364H17.4016Z"
          fill={color ? color : "#100C1A"}
        />
        <path
          d="M22.1207 1.50399V0.751996L21.1165 1.35151C19.9572 2.04326 19.2421 3.3308 19.2421 4.72545C19.2421 4.72545 19.2479 5.48042 19.2587 5.58753C19.416 7.11607 20.6702 8.30245 22.1838 8.26898C23.7575 8.23402 25.0001 6.85425 25.0001 5.20967V0L22.1214 1.50325L22.1207 1.50399ZM22.1207 7.38012C21.0252 7.38012 20.1369 6.46821 20.1369 5.34356C20.1369 4.21891 21.0252 3.307 22.1207 3.307C23.2162 3.307 24.1045 4.21891 24.1045 5.34356C24.1045 6.46821 23.2162 7.38012 22.1207 7.38012Z"
          fill={color ? color : "#100C1A"}
        />
      </svg>
    </SVGUniqueID>
  );
};

export default MiniLogo;