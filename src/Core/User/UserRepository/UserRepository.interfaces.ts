import { IRepositoryResponse } from "Core/types/Repository";

interface IUserRepository {
  getCurrentUser(): IRepositoryResponse<IUser>;
  authByEmail(email: string): IRepositoryResponse<IUserResponse>;
  authByWallet(wallet: string): IRepositoryResponse<IUserResponse>;
  verifyTimedPassword(email: string, password: number): IRepositoryResponse<IUserResponse>;
}

interface IUser {
  user: {
    dataValues: {
      email: string | null;
      wallet: string | null;
    };
  };
}

interface IUserResponse {
  token: string;
  needPassword?: boolean;
}

export type { IUserRepository, IUserResponse, IUser };
