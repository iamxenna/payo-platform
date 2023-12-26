import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { UserTypesEntity } from "../UserTypeEntity";
import { IUserTypeRepository, UserTypeRepository } from "../UserTypeRepository";

export interface IUserTypeInteractor {
  getAllTypes: Thunk<void>;
}

export const createUserTypeInteractor = (
  Entity: typeof UserTypesEntity,
  Repository: IUserTypeRepository,
): IUserTypeInteractor => ({
  getAllTypes: createAsyncThunk("UserTypeInteractor/getAllTypes", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getAllTypes();
      dispatch(Entity.actions.setTypes(data));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const UserTypeInteractor = createUserTypeInteractor(UserTypesEntity, UserTypeRepository);
