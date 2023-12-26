import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICard, IGroup, IItem } from "Core/Showcase/ShowcaseEntity";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IMerchantEntityState, IMerchantProfileData } from "./MerchantEntity.interfaces";

const initialState: IMerchantEntityState & IWithNetworkState = {
  ...withNetworkState,
  card: null,
  group: null,
  showcase: [],
  profile: null,
};

export const MerchantEntity = createSlice({
  name: "MerchantEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    clearMerchantData(state) {
      state = initialState;
    },
    setCard(state, action: PayloadAction<ICard>) {
      state.card = action.payload;
    },
    setGroup(state, action: PayloadAction<IGroup>) {
      state.group = action.payload;
    },
    setShowcase(state, action: PayloadAction<IItem[]>) {
      state.showcase = action.payload;
    },
    setProfile(state, action: PayloadAction<IMerchantProfileData>) {
      state.profile = action.payload;
    },
  },
});
