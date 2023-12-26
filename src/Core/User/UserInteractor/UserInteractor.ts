import { createAsyncThunk } from "@reduxjs/toolkit";
import { Thunk } from "Core/types/Interactor";
import { UserEntity } from "Core/User/UserEntity";
import { IUserRepository, UserRepository } from "Core/User/UserRepository";
import { Cookie, COOKIE_KEYS, ICookie } from "libs/Cookie";
import { Notification } from "libs/Notification";
import InjectedModule from "Modules/InjectedModule/InjectedModule";

export interface IUserInteractor {
  checkUser: Thunk<void>;
  authByWallet: Thunk<{ walletName: string }>;
  authByEmail: Thunk<{ email: string }>;
  verifyPassword: Thunk<{ email: string; password: number }>;
  logout: Thunk<void>;
}

export const createUserInteractor = (
  Repository: IUserRepository,
  Entity: typeof UserEntity,
  Cookie: ICookie,
): IUserInteractor => ({
  checkUser: createAsyncThunk("UserInteractor/checkUser", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const token = Cookie.get(COOKIE_KEYS.JWT_TOKEN);
      if (token) {
        const { data: currentData } = await Repository.getCurrentUser();
        if (currentData.user.dataValues.wallet) {
          const { wallet, provider, network } = await InjectedModule.connectWallet();

          const { data } = await Repository.authByWallet(wallet);

          Cookie.set(COOKIE_KEYS.JWT_TOKEN, data.token);
          dispatch(Entity.actions.setWallet({ wallet, provider, network }));
          dispatch(Entity.actions.setToken(data.token));
        }
      }
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
      Cookie.remove(COOKIE_KEYS.JWT_TOKEN);
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  authByWallet: createAsyncThunk("UserInteractor/authByWallet", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { wallet, provider, network } = await InjectedModule.connectWallet();
      dispatch(Entity.actions.setWallet({ wallet, provider, network }));
      const { data } = await Repository.authByWallet(wallet);
      Cookie.set(COOKIE_KEYS.JWT_TOKEN, data.token);
      dispatch(Entity.actions.setToken(data.token));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  authByEmail: createAsyncThunk("UserInteractor/authByEmail", async ({ email }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      await Repository.authByEmail(email);
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  verifyPassword: createAsyncThunk("UserInteractor/verifyPassword", async ({ email, password }, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      const { data } = await Repository.verifyTimedPassword(email, +password);
      if (!data.token) {
        Notification.error("Invalid code");
      }
      await Cookie.set(COOKIE_KEYS.JWT_TOKEN, data.token);
      dispatch(Entity.actions.setToken(data.token));
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
  logout: createAsyncThunk("UserInteractor/logout", async (_, { dispatch }) => {
    try {
      dispatch(Entity.actions.setLoading(true));
      dispatch(Entity.actions.logout());
      Cookie.remove(COOKIE_KEYS.JWT_TOKEN);
    } catch (err: any) {
      dispatch(Entity.actions.setError(err.message));
    } finally {
      dispatch(Entity.actions.setLoading(false));
    }
  }),
});

export const UserInteractor = createUserInteractor(UserRepository, UserEntity, Cookie);
