import { HttpClient } from "libs/HttpClient";
import { IMerchantRepository } from "./MerchantRepository.interfaces";

export const MerchantRepository: IMerchantRepository = {
  getCard: async (id: number) => {
    try {
      return await HttpClient.get(`/card/${id}/merchant`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  getGroup: async (id: number) => {
    try {
      return await HttpClient.get(`/group/${id}/merchant`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  getShowcase: async (id: number) => {
    try {
      return await HttpClient.get(`/showcase/${id}/merchant`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
