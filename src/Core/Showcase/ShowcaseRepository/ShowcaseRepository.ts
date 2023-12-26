import {
  IShowcaseResponse,
  IShowcaseRepository,
  ICardCreateRequest,
  IGroupCreateRequest,
  IGroupUpdateRequest,
  ICardUpdateRequest,
  IDeleteGroupType,
  IArchiveGroupType,
} from "./ShowcaseRepository.interfaces";
import { HttpClient } from "libs/HttpClient";

export const ShowcaseRepository: IShowcaseRepository = {
  getShowcase: async () => {
    try {
      return await HttpClient.get<IShowcaseResponse>("/showcase");
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  createCard: async (data: ICardCreateRequest) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((el: string) => {
        formData.append(el, data[el]);
      });
      return await HttpClient.post<IShowcaseResponse>("/card", formData);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  createGroup: async (data: IGroupCreateRequest) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((el: string) => {
        formData.append(el, data[el]);
      });
      return await HttpClient.post<IShowcaseResponse>("/group/create", formData);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  updateGroup: async (data: IGroupUpdateRequest) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((el: string) => {
        formData.append(el, data[el]);
      });
      return await HttpClient.put<IShowcaseResponse>("/group", formData);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  updateCard: async (data: ICardUpdateRequest) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);
      keys.forEach((el: string) => {
        formData.append(el, data[el]);
      });
      return await HttpClient.put<IShowcaseResponse>(`/card/${data.id}`, formData);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  archiveCard: async (id: number, statusId: number) => {
    try {
      return await HttpClient.put(`/card/${id}`, {
        statusId: statusId,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  archiveGroup: async (id: number, statusId: number, type: IArchiveGroupType) => {
    try {
      return await HttpClient.post(`/group/${id}/archive`, {
        type,
        statusId,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  deleteCard: async (id: number) => {
    try {
      return await HttpClient.delete(`/card/${id}`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
  deleteGroup: async (id: number, type: IDeleteGroupType) => {
    try {
      return await HttpClient.post(`/group/${id}`, {
        type,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }
  },
};
