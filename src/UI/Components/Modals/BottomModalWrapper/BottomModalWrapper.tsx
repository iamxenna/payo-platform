import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./styles.module.css";

interface BottomModalWrapperProps {
  children: ReactNode;
  isVisible: boolean;
  close(): void;
}

export const BottomModalWrapper: FC<BottomModalWrapperProps> = ({ children, isVisible, close }) => {
  return (
    <CSSTransition
      in={isVisible}
      classNames={{
        exitActive: "animate__animated animate__fadeOutDown",
        enterActive: "animate__animated animate__fadeInUp",
      }}
      unmountOnExit
      timeout={890}
    >
      <div className={styles.wrapper}>
        <div className={styles.cancelBtn} onClick={() => close()}>
          {children}
          <div className={classNames(styles.cancel, styles.borderNone)}>
            <p className={styles.title}>Cancel</p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
