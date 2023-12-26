import type React from "react";
import { ReactNode } from "react";

type SelectProps = {
  title?: string | null;
  value: string | ReactNode | undefined;
  children: ReactNode[];
  onChange: (value: string | number) => void;
  customWrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  customClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  customOptionClassName?: React.HTMLAttributes<HTMLDivElement>["className"];
  disabled?: boolean;
  isCenter?: boolean;
  withNone?: boolean;
};

type OptionProps = {
  value: string;
  children: string;
  extraSymbol?: JSX.Element | ReactNode;
  state?: string;
};

export type { SelectProps, OptionProps };
