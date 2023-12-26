import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { ITransferEntityState, ITXStatus } from "./TransferEntity.interfaces";

const initialState: ITransferEntityState & IWithNetworkState = {
  ...withNetworkState,
  txLoading: false,
  txStatus: null,
};

export const TransferEntity = createSlice({
  name: "AppEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setTxLoading(state, action: PayloadAction<boolean>) {
      state.txLoading = action.payload;
    },
    setTxStatus(state, action: PayloadAction<ITXStatus>) {
      state.txStatus = action.payload;
    },
  },
});
