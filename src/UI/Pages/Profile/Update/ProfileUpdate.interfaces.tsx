import { INetworkTokens, ISocialLinks } from "Core/Profile/ProfileEntity";

interface IProfileUpdateState {
  avatar: string;
  userName: string;
  description: string;
  type: string;
  tNumber: string;
  website: string;
  socialNetworks: ISocialLinks[];
  email: string;
  wallet: string;
  notification: string;
  language: string;
  tokens: {
    binance: INetworkTokens[];
    polygon: INetworkTokens[];
  };
}

export type { IProfileUpdateState };
