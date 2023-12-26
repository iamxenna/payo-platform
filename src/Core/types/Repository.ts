import { AxiosResponse } from "axios";

type IRepositoryResponse<Response> = Promise<AxiosResponse<Response, any>>;

type IError = {
  data: any;
  error: string;
};

export type { IRepositoryResponse, IError };
