import { TransferABI } from "../../ABI";
import type { IConfig } from "../interfaces";

const configurationTestnet: IConfig = {
  networks: {
    97: {
      name: "BNB Smart Chain Testnet",
      currency: "BNB",
      dec: 18,
      rpc: "https://data-seed-prebsc-1-s3.binance.org:8545",
    },
    80001: {
      name: "Mumbai",
      currency: "MATIC",
      dec: 18,
      rpc: "https://matic-mumbai.chainstacklabs.com",
    },
  },
  payoContracts: {
    97: {
      transfer: {
        address: "0x1F6Fa7C7e2a7202E38c704eD1128205D0cb891f0",
        abi: TransferABI,
      },
    },
    80001: {
      transfer: {
        address: "0xcca868110941557035ee0132E872f17774D02621",
        abi: TransferABI,
      },
    },
  },
  op: {
    97: {
      BUSD: "0xc8536d3cd9DAF2ef0074103f2022D6097b5a079A",
      USDT: "0xc8536d3cd9DAF2ef0074103f2022D6097b5a079A",
      USDC: "0xc8536d3cd9DAF2ef0074103f2022D6097b5a079A",
      DAI: "0xc8536d3cd9DAF2ef0074103f2022D6097b5a079A",
    },
    80001: {
      BUSD: "0x7EfACC8d251976f2d472b17B275c2f670c16eB6A",
      USDT: "0x7EfACC8d251976f2d472b17B275c2f670c16eB6A",
      USDC: "0x7EfACC8d251976f2d472b17B275c2f670c16eB6A",
      DAI: "0x7EfACC8d251976f2d472b17B275c2f670c16eB6A",
    },
  },
};

export const ErrorsText: { [key: string]: string } = {
  BNB: "Please switch metamask network to: Binance Smart Chain mainnet",
  MATIC: "Please switch metamask network to: Polygon mainnet",
};

export default configurationTestnet;
