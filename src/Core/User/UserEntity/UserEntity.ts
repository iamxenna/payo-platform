import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IUserEntityState, IWallet } from "./UserEntity.interfaces";

const initialState: IUserEntityState & IWithNetworkState = {
  ...withNetworkState,
  token: null,
  wallet: {
    wallet: null,
    provider: null,
    network: null,
  },
};

export const UserEntity = createSlice({
  name: "UserEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.wallet = {
        wallet: null,
        provider: null,
        network: null,
      };
    },
    setWallet(state, action: PayloadAction<IWallet>) {
      state.wallet.wallet = action.payload.wallet;
      state.wallet.network = action.payload.network;
      state.wallet.provider = action.payload.provider;
    },
  },
});
