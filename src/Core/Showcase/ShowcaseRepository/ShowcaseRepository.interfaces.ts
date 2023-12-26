import { AxiosResponse } from "axios";
import { IRepositoryResponse } from "Core/types/Repository";
import { ICard, IGroup } from "../ShowcaseEntity";

interface ICardCreateRequest {
  [key: string]: any;
  title: string;
  image: File | null;
  description: string;
  price: number;
  stock: number;
  cardTypeId: number;
  groupId?: number | null;
  isUnlimited: boolean;
}

interface IGroupCreateRequest {
  [key: string]: any;
  title: string;
  image: File | null;
}

type IDeleteGroupType = "withCards" | "archiveCard" | "removeCardFromGroup";

type IArchiveGroupType = "withCards" | "removeCardFromGroup";

interface IShowcaseResponse {
  id: number;
  groups: IGroup[];
  cards: ICard[];
}

type ICardUpdateRequest = Partial<ICardCreateRequest> & { id: number };
type IGroupUpdateRequest = Partial<IGroupCreateRequest & { id: number }>;

interface IShowcaseRepository {
  getShowcase(): Promise<AxiosResponse<IShowcaseResponse, any>>;
  createCard(data: ICardCreateRequest): IRepositoryResponse<IShowcaseResponse>;
  createGroup(data: IGroupCreateRequest): IRepositoryResponse<IShowcaseResponse>;
  updateGroup(data: IGroupUpdateRequest): IRepositoryResponse<IShowcaseResponse>;
  updateCard(data: ICardUpdateRequest): IRepositoryResponse<IShowcaseResponse>;
  archiveCard(id: number, statusId: number): IRepositoryResponse<any>;
  archiveGroup(id: number, statusId: number, type: IArchiveGroupType): IRepositoryResponse<any>;
  deleteCard(id: number): IRepositoryResponse<any>;
  deleteGroup(id: number, type: IDeleteGroupType): IRepositoryResponse<any>;
}

export type {
  IShowcaseRepository,
  IShowcaseResponse,
  IGroupCreateRequest,
  ICardCreateRequest,
  ICardUpdateRequest,
  IGroupUpdateRequest,
  IDeleteGroupType,
  IArchiveGroupType,
};
