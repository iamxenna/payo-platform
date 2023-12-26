interface IUserType {
  id: number;
  title: string;
}

interface IUserTypesEntityState {
  types: IUserType[];
}

export type { IUserTypesEntityState, IUserType };
