type ISort = "Newest" | "Oldest" | "Name: A-Z" | "Name: Z-A";
type IFilter = "All" | "Cards Only" | "Groups only";

interface IModalState {
  sort: boolean;
  filter: boolean;
  create: boolean;
  share: boolean;
}

export type { IModalState, ISort, IFilter };
