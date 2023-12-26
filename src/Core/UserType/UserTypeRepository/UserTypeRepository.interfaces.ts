import { IRepositoryResponse } from "Core/types/Repository";
import { IUserType } from "../UserTypeEntity";

interface IUserTypeRepository {
  getAllTypes(): IRepositoryResponse<IUserType[]>;
}

export type { IUserTypeRepository };
