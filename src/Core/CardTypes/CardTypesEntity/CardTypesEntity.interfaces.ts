interface ICardType {
  id: number;
  title: string;
}

interface ICardTypesState {
  types: ICardType[];
}

export type { ICardTypesState, ICardType };
