type ILinkType = "twitter" | "linkedIn" | "facebook" | "instagram" | "whatsApp" | "telegram" | "else";

type INetworkTokens = "MATIC" | "BNB" | "USDT" | "USDC" | "BUSD" | "DAI";
interface ISocialLinks {
  type: ILinkType;
  title: string;
  network: string;
}

interface IProfileEntityState {
  id: number;
  avatar: string;
  userName: string;
  email: string | null;
  website: string | null;
  tNumber: string | null;
  description: string | null;
  userType: {
    id: number;
    title: string;
  };
  socialNetworks: ISocialLinks[];
  tokens: {
    binance: INetworkTokens[];
    polygon: INetworkTokens[];
  };
}

export type { IProfileEntityState, ISocialLinks, INetworkTokens, ILinkType };
