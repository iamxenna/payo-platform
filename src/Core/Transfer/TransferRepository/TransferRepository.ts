import { HttpClient } from "libs/HttpClient";
import { IPurchaseRequest, ITransferRepository, IUpdateStatusRequest } from "./TransferRepository.interfaces";

export const TransferRepository: ITransferRepository = {
  saveTransfer: async (data: IPurchaseRequest) => {
    try {
      return await HttpClient.post("/purchase", {
        ...data,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  },
  updateStatus: async (data: IUpdateStatusRequest) => {
    try {
      return await HttpClient.put("/purchase/update", {
        ...data,
      });
    } catch (err: any) {
      throw new Error(err);
    }
  },
};
