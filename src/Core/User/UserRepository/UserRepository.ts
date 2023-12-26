import { IUserRepository, IUserResponse, IUser } from "Core/User/UserRepository";
import { HttpClient } from "libs/HttpClient";

export const UserRepository: IUserRepository = {
  getCurrentUser: async () => {
    try {
      return await HttpClient.get<IUser>("/user/current");
    } catch (err: any) {
      return err.message;
    }
  },
  authByEmail: async (email) => {
    try {
      return await HttpClient.post<IUserResponse>("/user/authEmail", {
        email,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  authByWallet: async (wallet) => {
    try {
      return await HttpClient.post<IUserResponse>("/user/authWallet", {
        wallet,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  verifyTimedPassword: async (email, password) => {
    try {
      return await HttpClient.post<IUserResponse>("/user/verifyPassword", {
        email,
        password,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
