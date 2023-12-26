import { Button } from "Components/Button/Button";
import { useClickOutside } from "hooks/useClickOutside";
import React, { FC, useRef } from "react";
import { ChooseActionTypeModalProps } from "./ChooseActionTypeModal.interfaces";
import styles from "./styles.module.css";

export const ChooseActionTypeModal: FC<ChooseActionTypeModalProps> = ({ text, params, close }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      close();
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={modalRef}>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnContainer}>
          {params.map(({ title, action }, idx) => (
            <Button key={idx} variant="primary" opClassName={styles.actionBtn} onClick={action}>
              {title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
