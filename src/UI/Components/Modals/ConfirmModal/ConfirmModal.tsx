import React, { FC, useRef } from "react";
import { Button } from "Components/Button/Button";
import { ConfirmModalProps } from "./ConfirmModal.interfaces";
import styles from "./styles.module.css";
import { useClickOutside } from "hooks/useClickOutside";

export const ConfirmModal: FC<ConfirmModalProps> = ({ text, onAccept, onReject }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      onReject();
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={modalRef}>
        <p className={styles.text}>{text}</p>
        <div className={styles.btnContainer}>
          <Button variant="primary" opClassName={styles.cancelBtn} onClick={onReject}>
            Cancel
          </Button>
          <Button variant="primary" opClassName={styles.confirmBtn} onClick={onAccept}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};
