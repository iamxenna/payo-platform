import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { IProfileRepository, IProfileUpdateRequest, ProfileRepository } from "Core/Profile/ProfileRepository";
import { ProfileEntity } from "Core/Profile/ProfileEntity";
import { INotification, Notification } from "libs/Notification";

export interface IProfileInteractor {
  getProfile: Thunk<void>;
  updateProfile: Thunk<{ data: IProfileUpdateRequest }>;
}

export const createProfileInteractor = (
  Repository: IProfileRepository,
  Entity: typeof ProfileEntity,
  Notification: INotification,
): IProfileInteractor => ({
  getProfile: createAsyncThunk("ProfileInteractor/authByWallet", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.getProfile();
      dispatch(Entity.actions.setProfile(data.profile));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  updateProfile: createAsyncThunk("ProfileInteractor/updateProfile", async ({ data: updatedProfile }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.updateProfile(updatedProfile);
      dispatch(Entity.actions.setProfile(data.profile));
      Notification.success("Data successfully saved");
    } catch (err: any) {
      Notification.error("This email or wallet is already used by another user");
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const ProfileInteractor = createProfileInteractor(ProfileRepository, ProfileEntity, Notification);
