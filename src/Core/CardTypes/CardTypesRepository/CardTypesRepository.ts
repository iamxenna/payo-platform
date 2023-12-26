import { HttpClient } from "libs/HttpClient";
import { ICardTypesRepository } from "./CardTypesRepository.interfaces";

export const CardTypesRepository: ICardTypesRepository = {
  getCardTypes: async () => {
    try {
      return await HttpClient.get("/cardTypes/all");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
