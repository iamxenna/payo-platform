import { createSlice } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IDeviceEntity } from "./DeviceEntity.interfaces";

const initialState: IDeviceEntity & IWithNetworkState = {
  ...withNetworkState,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isMobileLayoutForTablet: false,
};

export const DeviceEntity = createSlice({
  name: "DeviceEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setMobile: (state) => {
      state.isMobile = true;
      state.isTablet = false;
      state.isMobileLayoutForTablet = false;
      state.isDesktop = false;
    },
    setTablet: (state) => {
      state.isTablet = true;
      state.isMobile = false;
      state.isMobileLayoutForTablet = false;
      state.isDesktop = false;
    },
    setDesktop: (state) => {
      state.isTablet = false;
      state.isMobile = false;
      state.isMobileLayoutForTablet = false;
      state.isDesktop = true;
    },
    setMobileLayoutForTablet: (state) => {
      state.isTablet = false;
      state.isMobile = false;
      state.isMobileLayoutForTablet = true;
      state.isDesktop = false;
    },
  },
});
