import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IRates, IRatesEntityState } from "./RatesEntity.interfaces";

const initialState: IRatesEntityState & IWithNetworkState = {
  ...withNetworkState,
  rates: null,
};

export const RatesEntity = createSlice({
  name: "RatesEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setRates(state, action: PayloadAction<IRates>) {
      state.rates = action.payload;
    },
  },
});
