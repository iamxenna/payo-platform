import React, { FC, ReactNode } from "react";
import styles from "./styles.module.css";

interface ErrorPopupProps {
  children: ReactNode;
  text: string;
  isShow: boolean;
}

export const ErrorPopup: FC<ErrorPopupProps> = ({ children, text, isShow }) => {
  return (
    <div className={styles.wrapper}>
      {isShow && (
        <div className={styles.popupContainer}>
          <p className={styles.text}>{text}</p>
          <span className={styles.triangle} />
        </div>
      )}
      {children}
    </div>
  );
};
