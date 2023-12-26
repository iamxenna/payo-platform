import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IStatus, IStatusState } from ".";

const initialState: IStatusState & IWithNetworkState = {
  ...withNetworkState,
  statuses: [],
};

export const StatusEntity = createSlice({
  name: "StatusEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setStatuses(state, action: PayloadAction<IStatus[]>) {
      state.statuses = action.payload;
    },
  },
});
