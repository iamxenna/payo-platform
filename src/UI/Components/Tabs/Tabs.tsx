import classNames from "classnames";
import React, { FC } from "react";
import styles from "./styles.module.css";

interface TabsProps {
  active: number;
  tabs: { id: number; title: string }[];
  onClick: (elem: number) => void;
}

export const Tabs: FC<TabsProps> = ({ active, tabs, onClick }) => {
  return (
    <div className={styles.wrapper}>
      {tabs.map(({ title, id }) => {
        const isActive = id === active;
        return (
          <div className={styles.tabWrapper} key={id} onClick={() => onClick(id)}>
            <h1 className={classNames(styles.tabTitle, isActive && styles.active)}>{title}</h1>
            {isActive && <div className={styles.activeUnderline} />}
          </div>
        );
      })}
    </div>
  );
};
