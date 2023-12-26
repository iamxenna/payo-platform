import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { RatesEntity } from "../RatesEntity";
import { IRatesRepository, RatesRepository } from "../RatesRepository";

export interface IRatesInteractor {
  getRates: Thunk<void>;
}

export const createRatesInteractor = (Repository: IRatesRepository, Entity: typeof RatesEntity): IRatesInteractor => ({
  getRates: createAsyncThunk("RatesInteractor/getRates", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getRates();
      dispatch(
        Entity.actions.setRates({
          ...data,
          ETH: 1 / data.ETH,
          BNB: 1 / data.BNB,
          MATIC: 1 / data.MATIC,
        }),
      );
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const RatesInteractor = createRatesInteractor(RatesRepository, RatesEntity);
