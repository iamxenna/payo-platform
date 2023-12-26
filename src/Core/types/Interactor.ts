import { AsyncThunk } from "@reduxjs/toolkit";

export type Thunk<Args> = AsyncThunk<void, Args, any>;

export type ThunkResponse = {
  meta: { arg: any; requestId: string; requestStatus: "fulfilled" | "rejected" };
  payload: any;
  type: string;
};
