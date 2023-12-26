import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IWithNetworkState, withNetworkReducers, withNetworkState } from "helpers/networks";
import { IShowcaseEntityState, ICard, IGroup, IItem } from "./ShowcaseEntity.interfaces";

const init = {
  id: 0,
  items: [],
  groups: [],
  cards: [],
};

const initialState: IShowcaseEntityState & IWithNetworkState = {
  ...withNetworkState,
  ...init,
};

export const ShowcaseEntity = createSlice({
  name: "ShowcaseEntity",
  initialState,
  reducers: {
    ...withNetworkReducers,
    setGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload;
    },
    setCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
    setShowcase(state, action: PayloadAction<{ items: IItem[]; id: number }>) {
      state.id = action.payload.id;
      state.items = action.payload.items;
    },
    clear(state) {
      state = Object.assign(state, init);
    },
  },
});
