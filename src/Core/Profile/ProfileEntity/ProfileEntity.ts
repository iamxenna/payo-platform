import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IProfileRaw } from "../ProfileRepository";
import { IProfileEntityState } from "./ProfileEntity.interfaces";

const init = {
  id: 0,
  avatar: "",
  userName: "",
  website: "",
  userType: {
    id: 0,
    title: "",
  },
  email: "",
  tNumber: "",
  description: "",
  socialNetworks: [],
  language: "",
  notification: "",
  tokens: {
    polygon: [],
    binance: [],
  },
};

const initialState: IProfileEntityState & IWithNetworkState = {
  ...withNetworkState,
  ...init,
};

export const ProfileEntity = createSlice({
  name: "ProfileEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setProfile(state, action: PayloadAction<IProfileRaw>) {
      // TODO: refactor this
      const {
        user: { email },
      } = action.payload;
      state = Object.assign(state, action.payload);
      state.email = email;
    },
    setProfilePartial(state, action: PayloadAction<Partial<IProfileEntityState>>) {
      state = Object.assign(state, action.payload);
    },
    clearProfile(state) {
      state = Object.assign(state, init);
    },
  },
});
