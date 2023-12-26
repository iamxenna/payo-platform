import type { ToastOptions as ToastOptionsFromLibrary } from "react-toastify";

export enum NotyTypes {
  ERROR = "error",
  SUCCESS = "success",
  WARNING = "warning",
}

export type ToastOptions = Pick<
  ToastOptionsFromLibrary,
  "delay" | "autoClose" | "closeButton" | "closeOnClick" | "transition"
>;
