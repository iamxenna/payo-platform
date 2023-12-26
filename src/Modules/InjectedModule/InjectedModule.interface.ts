import type { Web3Provider } from "@ethersproject/providers";
import { TransactionData } from "Core/Transfer/TransferEntity";
import type { ContractReceipt, ethers } from "ethers";

type IConnectWalletReturn = {
  wallet: string;
  provider: Web3Provider;
  network: string;
};

interface IInjectedService {
  connectWallet(walletName: string): Promise<IConnectWalletReturn>;
  changeNetwork(chainId: number, currentNetwork: ethers.providers.Network): Promise<boolean>;
  importNetwork(chainId: number): Promise<void>;
  makeTransaction(data: TransactionData): Promise<ContractReceipt | false>;
}

export type { IConnectWalletReturn, IInjectedService };
