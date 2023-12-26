import { ICard, IItem } from "Core/Showcase/ShowcaseEntity";

const sort: { [key: string]: any } = {
  Newest: (items: IItem[]) =>
    items.sort((itemA, itemB) => (new Date(itemA.updatedAt).getTime() < new Date(itemB.updatedAt).getTime() ? 1 : -1)),
  Oldest: (items: IItem[]) =>
    items.sort((itemA, itemB) => (new Date(itemA.updatedAt).getTime() < new Date(itemB.updatedAt).getTime() ? -1 : 1)),
  "Name: A - Z": (items: IItem[]) => items.sort((itemA, itemB) => (itemA.title > itemB.title ? 1 : -1)),
  "Name: Z - A": (items: IItem[]) => items.sort((itemA, itemB) => (itemA.title < itemB.title ? 1 : -1)),
};

const filter: { [key: string]: any } = {
  All: (items: IItem[]) => items,
  "Product card": (items: IItem[]) =>
    items.filter((el) => el.type === "card" && (el as ICard).cardType.title === "Product"),
  "Donation card": (items: IItem[]) =>
    items.filter((el) => el.type === "card" && (el as ICard).cardType.title === "Donation"),
  Group: (items: IItem[]) => items.filter((el) => el.type === "group"),
};

export { sort, filter };
