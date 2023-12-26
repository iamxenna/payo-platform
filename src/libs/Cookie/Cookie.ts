import { default as JSCookie } from "js-cookie";

export enum COOKIE_KEYS {
  JWT_TOKEN = "JWT_TOKEN",
}

export interface ICookie {
  set(name: string, value: string): string | void;
  get(name: string): string | void;
  remove(name: string): void;
}

export const Cookie: ICookie = {
  set: JSCookie.set,
  get: JSCookie.get,
  remove: JSCookie.remove,
};
