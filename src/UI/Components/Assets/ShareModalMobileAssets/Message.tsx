import React, { FC } from "react";
import { IAsset } from "Components/Assets/assetTypes";
import SVGUniqueID from "react-svg-unique-id";

export const Message: FC<IAsset> = () => {
  return (
    <SVGUniqueID>
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
        <path
          d="M15.0534 26.0543L15.9541 27.2538H15.9541L15.0534 26.0543ZM15.125 26.0007L14.2322 24.7954L15.125 26.0007ZM18.9699 24.7055L18.98 26.2055L18.9699 24.7055ZM9.28447 26.8486L10.6864 27.382L9.28447 26.8486ZM11.5289 28.7006L10.6283 27.5011L11.5289 28.7006ZM28.7273 19.6064L30.1721 20.0094L28.7273 19.6064ZM24.1493 24.4187L24.5911 25.8522L24.1493 24.4187ZM5.68556 2.77336L6.39378 4.09564L5.68556 2.77336ZM2.73571 5.87417L4.0855 6.52844L2.73571 5.87417ZM25.3144 2.77336L24.6062 4.09564L25.3144 2.77336ZM28.2643 5.87417L26.9145 6.52844L28.2643 5.87417ZM9.01322 12.3188C8.44222 12.919 8.46591 13.8685 9.06612 14.4395C9.66634 15.0105 10.6158 14.9868 11.1868 14.3866L9.01322 12.3188ZM21.9868 14.3866C22.5578 13.7864 22.5341 12.8369 21.9339 12.2659C21.3337 11.6949 20.3842 11.7186 19.8132 12.3188L21.9868 14.3866ZM15.5 13.3527L14.0702 13.8061V13.8061L15.5 13.3527ZM18.2 0.5H12.8V3.5H18.2V0.5ZM0.5 13.3527V19.3531H3.5V13.3527H0.5ZM30.5 15.0332V13.3527H27.5V15.0332H30.5ZM7.09174 26.2054H7.90411V23.2054H7.09174V26.2054ZM12.4296 29.9002L15.9541 27.2538L14.1528 24.8548L10.6283 27.5011L12.4296 29.9002ZM19.0578 26.2054H19.7987V23.2054H19.0578V26.2054ZM15.9541 27.2538C15.9916 27.2257 16.005 27.2156 16.0179 27.2061L14.2322 24.7954C14.2097 24.812 14.1872 24.8289 14.1528 24.8548L15.9541 27.2538ZM19.0578 23.2054C19.0155 23.2054 18.9876 23.2054 18.9598 23.2056L18.98 26.2055C18.9954 26.2054 19.0117 26.2054 19.0578 26.2054V23.2054ZM16.0179 27.2061C16.8929 26.5579 17.9266 26.2126 18.98 26.2055L18.9598 23.2056C17.2586 23.217 15.6089 23.7756 14.2322 24.7954L16.0179 27.2061ZM7.90411 26.2054C7.90201 26.2054 7.89584 26.205 7.88752 26.2027C7.8795 26.2005 7.87305 26.1976 7.86878 26.1951C7.86088 26.1906 7.86556 26.191 7.87412 26.2042C7.88265 26.2175 7.88934 26.2351 7.8915 26.2537C7.89335 26.2696 7.89242 26.2891 7.88254 26.3151L10.6864 27.382C11.4108 25.4783 10.1157 23.2054 7.90411 23.2054V26.2054ZM7.88254 26.3151C7.35883 27.6914 7.86015 29.0461 8.79214 29.8152C9.73594 30.594 11.2024 30.8216 12.4296 29.9002L10.6283 27.5011C10.6113 27.5139 10.6101 27.5109 10.6255 27.5062C10.6406 27.5016 10.6592 27.4992 10.6774 27.5002C10.7119 27.5022 10.7164 27.5135 10.7015 27.5013C10.6869 27.4892 10.6772 27.4729 10.6738 27.4609C10.6724 27.4562 10.6715 27.4506 10.6718 27.4422C10.6721 27.4342 10.6739 27.4147 10.6864 27.382L7.88254 26.3151ZM27.5 15.0332C27.5 17.5312 27.4861 18.4734 27.2825 19.2034L30.1721 20.0094C30.5139 18.7841 30.5 17.3293 30.5 15.0332H27.5ZM19.7987 26.2054C21.9687 26.2054 23.3908 26.2221 24.5911 25.8522L23.7074 22.9853C23.0476 23.1886 22.1894 23.2054 19.7987 23.2054V26.2054ZM27.2825 19.2034C26.7657 21.0559 25.4008 22.4633 23.7074 22.9853L24.5911 25.8522C27.3097 25.0142 29.3952 22.7947 30.1721 20.0094L27.2825 19.2034ZM0.5 19.3531C0.5 23.0661 3.38156 26.2054 7.09174 26.2054V23.2054C5.17774 23.2054 3.5 21.5521 3.5 19.3531H0.5ZM12.8 0.5C10.9358 0.5 9.44289 0.498712 8.23826 0.602171C7.01378 0.707335 5.95245 0.92881 4.97735 1.45107L6.39378 4.09564C6.86258 3.84455 7.46829 3.67934 8.49497 3.59117C9.54149 3.50129 10.8838 3.5 12.8 3.5V0.5ZM3.5 13.3527C3.5 11.3422 3.50106 9.92022 3.58745 8.80866C3.67265 7.71254 3.83395 7.04739 4.0855 6.52844L1.38592 5.2199C0.901755 6.21875 0.695204 7.30595 0.596474 8.57619C0.498944 9.83099 0.5 11.3893 0.5 13.3527H3.5ZM4.97735 1.45107C3.41953 2.28544 2.1667 3.60911 1.38592 5.2199L4.0855 6.52844C4.599 5.46906 5.41141 4.6218 6.39378 4.09564L4.97735 1.45107ZM18.2 3.5C20.1162 3.5 21.4585 3.50129 22.505 3.59117C23.5317 3.67934 24.1374 3.84455 24.6062 4.09564L26.0227 1.45107C25.0476 0.92881 23.9862 0.707335 22.7617 0.602171C21.5571 0.498712 20.0642 0.5 18.2 0.5V3.5ZM30.5 13.3527C30.5 11.3893 30.5011 9.83099 30.4035 8.57619C30.3048 7.30595 30.0982 6.21875 29.6141 5.2199L26.9145 6.52844C27.166 7.04739 27.3274 7.71254 27.4125 8.80866C27.4989 9.92022 27.5 11.3422 27.5 13.3527H30.5ZM24.6062 4.09564C25.5886 4.62179 26.401 5.46906 26.9145 6.52844L29.6141 5.2199C28.8333 3.60911 27.5805 2.28544 26.0227 1.45107L24.6062 4.09564ZM11.1868 14.3866L12.2181 13.3025L10.0445 11.2347L9.01322 12.3188L11.1868 14.3866ZM20.9555 15.4707L21.9868 14.3866L19.8132 12.3188L18.7819 13.4029L20.9555 15.4707ZM14.0702 13.8061C15.0156 16.7875 18.7374 17.8022 20.9555 15.4707L18.7819 13.4029C18.2262 13.9871 17.2249 13.8297 16.9298 12.8993L14.0702 13.8061ZM12.2181 13.3025C12.7738 12.7183 13.7751 12.8757 14.0702 13.8061L16.9298 12.8993C15.9844 9.91784 12.2626 8.90316 10.0445 11.2347L12.2181 13.3025Z"
          fill="#2C2936"
        />
      </svg>
    </SVGUniqueID>
  );
};