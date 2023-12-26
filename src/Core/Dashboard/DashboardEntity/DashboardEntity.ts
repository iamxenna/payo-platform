import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IDashboard } from "../DashboardRepository";
import { IDashboardEntityState } from "./DashboardEntity.interfaces";

const init = {
  id: 0,
  items: [],
};

const initialState: IDashboardEntityState & IWithNetworkState = {
  ...withNetworkState,
  ...init,
};

export const DashboardEntity = createSlice({
  name: "DashboardEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setDashboard(state, action: PayloadAction<IDashboard>) {
      state.id = action.payload.id;
      state.items = action.payload.items;
    },
    clear(state) {
      state = Object.assign(state, init);
    },
  },
});
