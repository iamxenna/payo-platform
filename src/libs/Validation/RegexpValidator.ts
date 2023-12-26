/* eslint-disable no-useless-escape */

import { ILinkType } from "Core/Profile/ProfileEntity";

/* eslint-disable no-control-regex */
const emailRegexp =
  /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;

export const snRegexp: { type: ILinkType; regexp: RegExp }[] = [
  {
    type: "twitter",
    regexp: /^https:\/\/twitter\.com\/[a-zA-Z0-9\-\_]+$/,
  },
  {
    type: "linkedIn",
    regexp: /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/,
  },
  {
    type: "facebook",
    regexp: /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9\W]+$/,
  },
  {
    type: "instagram",
    regexp: /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/,
  },
  {
    type: "whatsApp",
    regexp: /^$/,
  },
  {
    type: "telegram",
    regexp: /^https:\/\/t\.me\/[\w0-9\W]+$/,
  },
];

export const RegexpValidator = (type: "email", str: string) => {
  switch (type) {
    case "email":
      return new RegExp(emailRegexp, "g").test(str);
  }
};
