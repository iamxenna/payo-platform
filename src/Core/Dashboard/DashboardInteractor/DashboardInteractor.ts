import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { DashboardRepository, IDashboardRepository } from "../DashboardRepository";
import { DashboardEntity } from "../DashboardEntity";

export interface IDashboardInteractor {
  getDashboard: Thunk<void>;
}

export const createDashboardInteractor = (
  Repository: IDashboardRepository,
  Entity: typeof DashboardEntity,
): IDashboardInteractor => ({
  getDashboard: createAsyncThunk("CardTypesInteractor/getCardTypes", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getDashboard();
      dispatch(Entity.actions.setDashboard(data));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const DashboardInteractor = createDashboardInteractor(DashboardRepository, DashboardEntity);
