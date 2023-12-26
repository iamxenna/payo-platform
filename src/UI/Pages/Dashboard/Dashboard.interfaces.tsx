interface IModalState {
  sort: boolean;
  filter: boolean;
  export: boolean;
}
interface IDashboardItem {
  cardName: string;
  cardType: string;
  date: string;
  quantity: number;
  to: string;
  network: string;
  comment: string;
  amount: number;
  status: string;
}

export type { IDashboardItem, IModalState };
