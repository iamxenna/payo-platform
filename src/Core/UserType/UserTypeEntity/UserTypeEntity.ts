import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IUserTypesEntityState, IUserType } from "./UserTypeEntity.interfaces";

const initialState: IUserTypesEntityState & IWithNetworkState = {
  ...withNetworkState,
  types: [],
};

export const UserTypesEntity = createSlice({
  name: "UserTypeEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setTypes(state, action: PayloadAction<IUserType[]>) {
      state.types = action.payload;
    },
  },
});
