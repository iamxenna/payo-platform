import { IRepositoryResponse } from "Core/types/Repository";
import { INetworkTokens, ISocialLinks } from "../ProfileEntity";

interface IProfileRepository {
  getProfile(): IRepositoryResponse<IProfileResponse>;
  updateProfile(data: IProfileUpdateRequest): IRepositoryResponse<IProfileResponse>;
}

interface IProfile extends Omit<IProfileRaw, "avatar"> {
  [key: string]: any;
  avatar?: File;
}

type IProfileUpdateRequest = Partial<Omit<IProfile, "token" | "socialNetworks">> & {
  id: number;
  tokens?: string;
  socialNetworks?: string;
};
interface IProfileRaw {
  id: number;
  userName: string;
  tNumber: string | null;
  avatar: string;
  description: string | null;
  website: string | null;
  language: string;
  notification: string;
  userTypeId: number;
  userType: {
    id: number;
    title: string;
  };
  user: {
    email: string | null;
  };
  tokens: {
    binance: INetworkTokens[];
    polygon: INetworkTokens[];
  };
  socialNetworks: ISocialLinks[];
}

interface IProfileResponse {
  profile: IProfileRaw;
}

export type { IProfileRepository, IProfileResponse, IProfileRaw, IProfileUpdateRequest };
