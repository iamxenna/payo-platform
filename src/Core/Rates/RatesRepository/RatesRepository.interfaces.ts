import { IRepositoryResponse } from "Core/types/Repository";
import { IRates } from "../RatesEntity";

interface IRatesRepository {
  getRates(): IRepositoryResponse<IRates>;
}

export type { IRatesRepository };
