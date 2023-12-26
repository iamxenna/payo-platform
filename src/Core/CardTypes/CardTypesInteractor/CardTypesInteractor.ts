import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { CardTypesEntity } from "../CardTypesEntity";
import { CardTypesRepository, ICardTypesRepository } from "../CardTypesRepository";

export interface ICardTypesInteractor {
  getCardTypes: Thunk<void>;
}

export const createCardTypesInteractor = (
  Repository: ICardTypesRepository,
  Entity: typeof CardTypesEntity,
): ICardTypesInteractor => ({
  getCardTypes: createAsyncThunk("CardTypesInteractor/getCardTypes", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getCardTypes();
      dispatch(Entity.actions.setCardTypes(data));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const CardTypesInteractor = createCardTypesInteractor(CardTypesRepository, CardTypesEntity);
