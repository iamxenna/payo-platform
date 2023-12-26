interface ICard {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  stock: number | null;
  isUnlimited: boolean;
  groupId: number | null;
  updatedAt: Date;
  status: {
    id: number;
    title: string;
  };
  cardType: {
    id: number;
    title: string;
  };
}

interface IGroup {
  id: number;
  title: string;
  image: string;
  status: {
    id: number;
    title: string;
  };
  updatedAt: Date;
  cards: ICard[];
}

type IItem = (IGroup | ICard) & {
  type: "card" | "group";
};

interface IShowcaseEntityState {
  id: number;
  items: Array<IItem>;
  groups: Array<IGroup>;
  cards: Array<ICard>;
}

export type { IShowcaseEntityState, ICard, IGroup, IItem };
