import { Web3Provider } from "@ethersproject/providers";

interface IWallet {
  wallet: string | null;
  network: string | null;
  provider: Web3Provider | null;
}

interface IUserEntityState {
  token: string | null;
  wallet: IWallet;
}

export type { IUserEntityState, IWallet };
