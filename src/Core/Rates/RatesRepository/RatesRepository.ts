import { HttpClient } from "libs/HttpClient";
import { IRatesRepository } from "./RatesRepository.interfaces";

export const RatesRepository: IRatesRepository = {
  getRates: async () => {
    try {
      return await HttpClient.get(
        "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=USDT,USDC,DAI,BNB,ETH,BUSD,MATIC",
      );
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
