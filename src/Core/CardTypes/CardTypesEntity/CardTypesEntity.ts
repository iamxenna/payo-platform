import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { withNetworkState, withNetworkReducers, IWithNetworkState } from "helpers/networks";
import { ICardType, ICardTypesState } from "./CardTypesEntity.interfaces";

const initialState: ICardTypesState & IWithNetworkState = {
  ...withNetworkState,
  types: [],
};

export const CardTypesEntity = createSlice({
  name: "CardTypesEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setCardTypes(state, action: PayloadAction<ICardType[]>) {
      state.types = action.payload;
    },
  },
});
