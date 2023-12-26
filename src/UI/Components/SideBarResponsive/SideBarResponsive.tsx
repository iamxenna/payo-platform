import React from "react";
import styles from "./styles.module.css";
import Links from "Components/SideBar/Links/Links";

export const SideBarResponsive = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Links />
      </div>
    </div>
  );
};
