import React, { FC } from "react";
import { HelpModal } from "Components/HOCs/HelpModal/HelpModal";
import styles from "./styles.module.css";
import classNames from "classnames";
import { CardOptionsModalProps } from "./CardOptionsModal.interfaces";

export const CardOptionsModal: FC<CardOptionsModalProps> = ({ options, children, isOpen, setIsOpen, position }) => (
  <div className={styles.wrapper}>
    {isOpen && (
      <div
        className={classNames(
          styles.content,
          position === "left" ? styles.left : position === "center" ? styles.center : styles.right,
        )}
      >
        <HelpModal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className={styles.container}>
            {options.map(({ title, onClick, onMobile }, idx) => {
              if (onMobile === true) return;
              return (
                <p key={idx} className={styles.option} onClick={onClick}>
                  {title}
                </p>
              );
            })}
          </div>
        </HelpModal>
      </div>
    )}
    {children}
  </div>
);
