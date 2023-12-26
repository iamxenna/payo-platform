import { IPurchase } from "Core/Transfer/TransferRepository";

const sort: { [key: string]: any } = {
  Newest: (items: IPurchase[]) =>
    items.sort((itemA, itemB) => (new Date(itemA.updatedAt).getTime() < new Date(itemB.updatedAt).getTime() ? 1 : -1)),
  Oldest: (items: IPurchase[]) =>
    items.sort((itemA, itemB) => (new Date(itemA.updatedAt).getTime() < new Date(itemB.updatedAt).getTime() ? -1 : 1)),
  "Amount: Low - High": (items: IPurchase[]) => items.sort((itemA, itemB) => (itemA.amount > itemB.amount ? 1 : -1)),
  "Amount: High - Low": (items: IPurchase[]) => items.sort((itemA, itemB) => (itemA.amount < itemB.amount ? 1 : -1)),
};

const filter: { [key: string]: any } = {
  Received: (items: IPurchase[], email: string): IPurchase[] => items.filter((el) => el?.to !== email),
  Paid: (items: IPurchase[], email: string): IPurchase[] => items.filter((el) => el?.to === email),
  "Product card": (items: IPurchase[]): IPurchase[] => items.filter((el) => el?.cardType?.title !== "Product"),
  "Donation card": (items: IPurchase[]): IPurchase[] => items.filter((el) => el?.cardType?.title !== "Donation"),
};

export { filter, sort };
