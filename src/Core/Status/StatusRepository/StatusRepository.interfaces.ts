import { IRepositoryResponse } from "Core/types/Repository";
import { IStatus } from "../StatusEntity";

interface IStatusRepository {
  getStatuses(): IRepositoryResponse<IStatus[]>;
}

export type { IStatusRepository };
