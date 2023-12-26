import React, { FC } from "react";
import classname from "classnames";

import styles from "./Button.module.css";

interface IButton {
  variant: "primary" | "gradient" | "secondary";
  children: any;
  onClick: () => void;
  opClassName?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: FC<IButton> = ({
  variant,
  children,
  onClick,
  isLoading = false,
  disabled = false,
  opClassName = "",
}) => (
  <button
    onClick={!disabled ? onClick : undefined}
    className={classname(
      variant === "primary" ? styles.primary : variant === "secondary" ? styles.secondary : styles.gradient,
      styles.btn,
      opClassName,
      disabled && styles.disabled,
    )}
  >
    {isLoading ? "Waiting" : children}
  </button>
);
