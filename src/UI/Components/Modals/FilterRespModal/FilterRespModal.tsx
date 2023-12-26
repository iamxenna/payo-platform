import React, { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";

import styles from "./styles.module.css";
import { Checkbox } from "Components/Checkbox/Checkbox";

interface FilterRespModalProps {
  isVisible: boolean;
  filterValues: string[];
  selectedFilter: number[];
  isArchived?: boolean;
  setIsOpenModal(value: boolean): void;
  setSelectedFilter(idx: number): void;
  setIsArchived?: (value: boolean) => void;
}

export const FilterRespModal: FC<FilterRespModalProps> = ({
  isVisible,
  setIsOpenModal,
  selectedFilter,
  filterValues,
  setSelectedFilter,
  isArchived,
  setIsArchived,
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
            <p className={styles.title}>Filter by</p>
          </div>
          <div className={styles.items}>
            {filterValues.map((el, idx) => (
              <div key={idx} onClick={() => setSelectedFilter(idx)} className={styles.filterItem}>
                <Checkbox isOn={selectedFilter.includes(idx)} onClick={() => setSelectedFilter(idx)} />
                <p>{el}</p>
              </div>
            ))}
            {isArchived !== undefined && setIsArchived && (
              <div onClick={() => setIsArchived(!isArchived)} className={styles.filterItem}>
                <Checkbox isOn={isArchived} onClick={() => setIsArchived(!isArchived)} />
                <p>Show archived</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
