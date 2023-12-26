import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { StatusEntity } from "../StatusEntity";
import { StatusRepository, IStatusRepository } from "../StatusRepository";

export interface IStatusInteractor {
  getStatuses: Thunk<void>;
}

export const createStatusInteractor = (
  Repository: IStatusRepository,
  Entity: typeof StatusEntity,
): IStatusInteractor => ({
  getStatuses: createAsyncThunk("StatusInteractor/getCardTypes", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getStatuses();
      dispatch(Entity.actions.setStatuses(data));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const StatusInteractor = createStatusInteractor(StatusRepository, StatusEntity);
