import { ICard } from "Core/Showcase/ShowcaseEntity";

const filter: { [key: string]: any } = {
  "Product card": (items: ICard[]): ICard[] => items.filter((el) => el?.cardType?.title !== "Product"),
  "Donation card": (items: ICard[]): ICard[] => items.filter((el) => el?.cardType?.title !== "Donation"),
};

export { filter };
