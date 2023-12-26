import React, { FC } from "react";
import { PaginationArrow } from "Components/Assets/PaginationArrow";
import styles from "./styles.module.css";
import classNames from "classnames";

interface PaginationProps {
  active: number;
  pageCount: number;
  setActive(idx: number): void;
}

export const Pagination: FC<PaginationProps> = ({ active, pageCount, setActive }) => {
  return (
    <div key={active} className={styles.wrapper}>
      <div className={styles.leftArrowContainer}>
        <PaginationArrow color={active === 0 ? "#CACACC" : undefined} />
      </div>
      <div className={styles.itemsContainer}>
        {active > 2 && (
          <div className={classNames(styles.paginationItem)} onClick={() => setActive(1)}>
            1 ...
          </div>
        )}
        {active > 1 && (
          <div className={classNames(styles.paginationItem)} onClick={() => setActive(active - 1)}>
            {active - 1}
          </div>
        )}
        <div className={classNames(styles.paginationItem, styles.active)}>{active}</div>
        {pageCount - active > 1 && (
          <div className={classNames(styles.paginationItem)} onClick={() => setActive(active + 1)}>
            {active + 1}
          </div>
        )}
        {pageCount !== active && pageCount > 0 && (
          <div className={classNames(styles.paginationItem)} onClick={() => setActive(pageCount)}>
            {pageCount - active > 1 && <span>...&nbsp;</span>}
            {pageCount}
          </div>
        )}
      </div>
      <div className={styles.rightArrowContainer}>
        <PaginationArrow />
      </div>
    </div>
  );
};
