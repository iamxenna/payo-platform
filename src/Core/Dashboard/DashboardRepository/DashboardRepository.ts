import { HttpClient } from "libs/HttpClient";
import type { IDashboardRepository } from "./DashboardRepository.interfaces";

export const DashboardRepository: IDashboardRepository = {
  getDashboard: async () => {
    try {
      return await HttpClient.get("/dashboard/current");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
