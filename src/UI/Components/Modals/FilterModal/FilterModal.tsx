import React, { FC } from "react";
import { HelpModal } from "Components/HOCs/HelpModal/HelpModal";
import { ModalProps } from "utils/i.modal";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Checkbox } from "Components/Checkbox/Checkbox";

interface FilterModalProps extends ModalProps {
  selectedFilter: number[];
  filterValues: string[];
  setSelectedFilter(idx: number): void;
}

export const FilterModal: FC<FilterModalProps> = ({
  selectedFilter,
  setSelectedFilter,
  filterValues,
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
              {filterValues.map((el, idx) => (
                <div key={idx} className={styles.itemContaier}>
                  <Checkbox isOn={selectedFilter.includes(idx)} isNegative onClick={() => setSelectedFilter(idx)} />
                  <p
                    onClick={() => setSelectedFilter(idx)}
                    className={classNames(styles.sortItem, selectedFilter.includes(idx) && styles.active)}
                  >
                    {el}
                  </p>
                </div>
              ))}
            </div>
          </HelpModal>
        </div>
      )}
      {children}
    </div>
  );
};
