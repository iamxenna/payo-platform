import { TransferABI } from "../../ABI";
import type { IConfig } from "../interfaces";

const configurationMainnet: IConfig = {
  networks: {
    56: {
      name: "BNB Smart Chain Mainnet",
      currency: "BNB",
      dec: 18,
      rpc: "https://bsc-dataseed1.binance.org/",
    },
    137: {
      name: "Polygon Mainnet",
      currency: "MATIC",
      dec: 18,
      rpc: "https://polygon-rpc.com/",
    },
  },
  payoContracts: {
    56: {
      transfer: {
        address: "0x67f01112ae8a3563751E3b38f236147ec9b41B1F",
        abi: TransferABI,
      },
    },
    137: {
      transfer: {
        address: "0x67f01112ae8a3563751E3b38f236147ec9b41B1F",
        abi: TransferABI,
      },
    },
  },
  op: {
    56: {
      BUSD: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      DAI: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    },
    137: {
      BUSD: "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7",
      USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      USDC: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      DAI: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
  },
};

export default configurationMainnet;
