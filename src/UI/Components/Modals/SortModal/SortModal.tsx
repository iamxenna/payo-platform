import React, { FC, SetStateAction } from "react";
import classNames from "classnames";
import { HelpModal } from "Components/HOCs/HelpModal/HelpModal";
import { ModalProps } from "utils/i.modal";
import styles from "./styles.module.css";

interface SortModalProps extends ModalProps {
  selectedSort: number;
  sortValues: string[];
  setSelectedSort: React.Dispatch<SetStateAction<number>>;
}

export const SortModal: FC<SortModalProps> = ({
  selectedSort,
  setSelectedSort,
  sortValues,
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.content}>
          <HelpModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.container}>
              {sortValues.map((el, idx) => {
                const active = selectedSort === idx;
                return (
                  <p
                    key={idx}
                    onClick={() => setSelectedSort(idx)}
                    className={classNames(styles.sortItem, active && styles.active)}
                  >
                    {el}
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
};
