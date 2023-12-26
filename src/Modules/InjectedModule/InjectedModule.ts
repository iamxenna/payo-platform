import { Contract, ContractReceipt, ContractTransaction, ethers } from "ethers";
import configurationMainnet from "./configuration/mainnet";
import configurationTestnet from "./configuration/testnet";
import { toPubChainId } from "utils/formatChainId";
import { IInjectedService } from "./InjectedModule.interface";
import { Notification, NotificationPromise } from "libs/Notification";
import { TransactionData } from "Core/Transfer/TransferEntity";
import { OpABI } from "./ABI";

class InjectedModule implements IInjectedService {
  public readonly _configuration =
    process.env.REACT_APP_NODE_ENV === "production" ? configurationMainnet : configurationTestnet;
  public async connectWallet() {
    if (typeof window.ethereum === "undefined") {
      throw new Error("Metamask is not installed in your browser");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const wallet = (await provider.send("eth_requestAccounts", []))[0] || null;

    const networkData = await provider.getNetwork();

    const network = parseInt(networkData.chainId.toString(), 10).toString();

    return {
      wallet,
      provider,
      network,
    };
  }

  public async importNetwork(chainId: number): Promise<void> {
    const { provider } = await this.connectWallet();
    await provider
      .send("wallet_addEthereumChain", [
        {
          chainId: toPubChainId(chainId),
          chainName: this._configuration.networks[chainId].name,
          nativeCurrency: {
            name: this._configuration.networks[chainId].currency,
            symbol: this._configuration.networks[chainId].currency,
            decimals: this._configuration.networks[chainId].dec,
          },
          rpcUrls: [this._configuration.networks[chainId].rpc],
        },
      ])
      .then(() => {
        Notification.success("Network changed successfully");
      })
      .catch(async (err) => {
        if (err.code !== 4902) {
          Notification.error("Internal Error");
        }
        await this.importNetwork(chainId);
      });
  }

  public async changeNetwork(chainId: number): Promise<any> {
    const { provider } = await this.connectWallet();
    const currentNetwork = provider.getNetwork();
    if (chainId === (await currentNetwork).chainId) {
      return;
    }
    await provider
      .send("wallet_switchEthereumChain", [{ chainId: toPubChainId(chainId) }])
      .then(() => {
        Notification.success("Network changed successfully");
      })
      .catch(async (err) => {
        if (err.code !== 4902) {
          Notification.error("Internal Error");
        }
        await this.importNetwork(chainId);
      });
  }

  public async getAllowance(chain: number, token: string): Promise<number> {
    const { provider } = await this.connectWallet();
    const wallet = await provider.getSigner().getAddress();
    const allowance = await new Contract(
      this._configuration.op[chain][token],
      OpABI,
      new ethers.providers.JsonRpcProvider(this._configuration.networks[chain].rpc),
    ).allowance(wallet, this._configuration.payoContracts[chain].transfer.address);
    return Number(allowance);
  }

  public async approve(chain: number, token: string): Promise<void> {
    const { provider } = await this.connectWallet();
    const tx: ContractTransaction = await new Contract(
      this._configuration.op[chain][token],
      OpABI,
      provider.getSigner(),
    ).approve(this._configuration.payoContracts[chain].transfer.address, ethers.utils.parseEther("100000"));
    const receiptPromise = tx.wait();

    const receipt = await NotificationPromise({ promise: receiptPromise, pending: "In processing" });

    if (!receipt.status) {
      Notification.error("Tokens approve failed");
      throw new Error("Approve Error");
    }
    Notification.success("Tokens approved successfully");
  }

  public async makeTransaction(data: TransactionData): Promise<ContractReceipt | false> {
    const { network, token, to, amount } = data;
    const { provider } = await this.connectWallet();
    const TransferContract = new Contract(
      this._configuration.payoContracts[network].transfer.address,
      this._configuration.payoContracts[network].transfer.abi,
      provider.getSigner(),
    );

    if (token === "BNB" || token === "MATIC") {
      const tx: ContractTransaction = await TransferContract.transferETH(to, {
        value: ethers.utils.parseEther(amount.toString()),
      });
      return await tx.wait();
    }

    const allowance = await this.getAllowance(network, token);

    if (allowance <= 0) {
      await this.approve(network, token);
    }

    const op = new Contract(this._configuration.op[network][token], OpABI, provider.getSigner());
    const tx: ContractTransaction = await TransferContract.transferToken(
      this._configuration.op[network][token],
      to,
      amount * 10 ** Number(await op.decimals()),
    );
    return await tx.wait();
  }
}

export default new InjectedModule();
