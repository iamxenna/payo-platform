import { IRepositoryResponse } from "Core/types/Repository";
import { ICardType } from "../CardTypesEntity";

interface ICardTypesRepository {
  getCardTypes(): IRepositoryResponse<ICardType[]>;
}

export type { ICardTypesRepository };
