import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";

import styles from "./styles.module.css";
import classNames from "classnames";

interface SortRespModalProps {
  setIsOpenModal(value: boolean): void;
  selectedSort: number;
  setSelectedSort(idx: number): void;
  sortValues: string[];
  isVisible: boolean;
}

export const SortRespModal: FC<SortRespModalProps> = ({
  isVisible,
  setIsOpenModal,
  selectedSort,
  setSelectedSort,
  sortValues,
}) => {
  return (
    <CSSTransition
      in={isVisible}
      classNames={{
        exitActive: "animate__animated animate__fadeOutRight",
        enterActive: "animate__animated animate__fadeInRight",
      }}
      unmountOnExit
      timeout={5000}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.head}>
            <div
              className={styles.arrow}
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              <ExportBackArrow />
            </div>
            <p className={styles.title}>Sort by</p>
          </div>
          <div className={styles.items}>
            {sortValues.map((el, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedSort(idx)}
                className={classNames(styles.sortElem, idx === selectedSort && styles.active)}
              >
                <p>{el}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
