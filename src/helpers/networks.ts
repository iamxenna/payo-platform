import { PayloadAction } from "@reduxjs/toolkit";

export interface IWithNetworkState {
  isLoading: boolean;
  isSubmitLoading: boolean;
  error: string;
}

export const withNetworkState: IWithNetworkState = {
  isLoading: false,
  isSubmitLoading: false,
  error: "",
};

export const withNetworkReducers = {
  setLoading(state: IWithNetworkState, action: PayloadAction<boolean>): void {
    state.isLoading = action.payload;
  },
  setError(state: IWithNetworkState, action: PayloadAction<string>): void {
    state.error = action.payload;
  },
};
