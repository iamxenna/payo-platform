import { HttpClient } from "libs/HttpClient";
import { IUserTypeRepository } from "./UserTypeRepository.interfaces";

export const UserTypeRepository: IUserTypeRepository = {
  getAllTypes: async () => {
    try {
      return await HttpClient.get("/userTypes/all");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
