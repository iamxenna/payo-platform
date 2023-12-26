import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Twitter: FC<IAsset> = () => {
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
            d="M30 0C13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0Zm-.835 25.422-.063-1.038c-.19-2.69 1.468-5.148 4.091-6.1.966-.34 2.602-.382 3.673-.086.42.128 1.217.551 1.783.933l1.029.699 1.133-.36c.63-.191 1.469-.509 1.846-.72.357-.192.672-.297.672-.234 0 .36-.776 1.589-1.427 2.267-.881.953-.63 1.038 1.154.402 1.07-.36 1.091-.36.882.043-.126.212-.777.953-1.47 1.631-1.175 1.165-1.238 1.292-1.238 2.267 0 1.504-.713 4.64-1.426 6.355-1.323 3.22-4.155 6.547-6.988 8.22-3.987 2.352-9.296 2.945-13.766 1.568-1.49-.466-4.05-1.653-4.05-1.864 0-.064.776-.149 1.72-.17a11.815 11.815 0 0 0 5.625-1.568l1.133-.678-1.301-.444c-1.847-.636-3.505-2.098-3.924-3.475-.126-.445-.084-.466 1.09-.466l1.218-.021-1.028-.487c-1.218-.615-2.33-1.653-2.875-2.712-.399-.763-.903-2.69-.756-2.839.042-.063.483.064.987.233 1.448.53 1.636.403.797-.487-1.574-1.61-2.056-4.004-1.301-6.27l.357-1.018 1.385 1.377c2.833 2.776 6.17 4.428 9.988 4.915l1.05.127Z"
            fill="#100C1A"
          />
        </g>
      </svg>
    </SVGUniqueID>
  );
};