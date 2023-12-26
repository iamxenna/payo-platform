import { HttpClient } from "libs/HttpClient";
import { IStatusRepository } from "./StatusRepository.interfaces";

export const StatusRepository: IStatusRepository = {
  getStatuses: async () => {
    try {
      return await HttpClient.get("/statuses/all");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
