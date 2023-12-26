import { IProfileRepository, IProfileResponse } from "./ProfileRepository.interfaces";
import { HttpClient } from "libs/HttpClient";

export const ProfileRepository: IProfileRepository = {
  getProfile: async () => {
    try {
      return await HttpClient.get<IProfileResponse>("/profile/current");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  updateProfile: async (data) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((el: string) => {
        formData.append(el, data[el]);
      });
      return await HttpClient.post<IProfileResponse>("/profile", formData);
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
