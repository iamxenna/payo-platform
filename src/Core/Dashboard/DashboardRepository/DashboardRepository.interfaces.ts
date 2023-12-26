import { IPurchase } from "Core/Transfer/TransferRepository";
import { IRepositoryResponse } from "Core/types/Repository";

interface IDashboard {
  id: number;
  items: IPurchase[];
}

interface IDashboardRepository {
  getDashboard(): IRepositoryResponse<IDashboard>;
}

export type { IDashboardRepository, IDashboard };
