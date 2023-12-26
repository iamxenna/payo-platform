import { ILinkType } from "Core/Profile/ProfileEntity";
import { snRegexp } from "libs/Validation/RegexpValidator";

export function snChecker(value: string): ILinkType {
  for (const el of snRegexp) {
    if (new RegExp(el.regexp).test(value)) {
      return el.type;
    }
  }
  return "else";
}
