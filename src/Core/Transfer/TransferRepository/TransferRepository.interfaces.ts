import { IRepositoryResponse } from "Core/types/Repository";
import { TransactionData } from "../TransferEntity";

interface IPurchaseRequest {
  cardName: string;
  cardTypeId: number;
  quantity: number;
  network: string;
  currency: string;
  comment: string;
  from: string;
  to: string;
  amount: number;
}
interface IPurchase extends TransactionData {
  cardName: string;
  cardType: {
    id: number;
    title: string;
  };
  currency: string;
  quantity: number;
  comment: string;
  from: string;
  status: {
    title: string;
    id: number;
  };
  updatedAt: Date;
}

interface IUpdateStatusRequest {
  status: "Cancelled" | "Completed";
  purchaseId: number;
}

interface ITransferRepository {
  saveTransfer(data: IPurchaseRequest): IRepositoryResponse<any>;
  updateStatus(data: IUpdateStatusRequest): IRepositoryResponse<any>;
}

export type { ITransferRepository, IPurchase, IPurchaseRequest, IUpdateStatusRequest };
