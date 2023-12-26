import { ChangeEvent } from "react";

type ValidationReturn = Array<{
  func: (value: any) => boolean;
  errorText: string;
  skip: boolean;
}>;

type ValidationUnit<V extends object> = Partial<Record<keyof V, ValidationReturn>>;

type EventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

type Key<V extends object> = `${Exclude<keyof V, symbol>}Error`;
type Return<V extends object> = Record<Key<V>, string>;

export type { ValidationReturn, ValidationUnit, EventType, Key, Return };
