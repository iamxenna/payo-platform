import { Dots } from "Components/Assets/Dots";
import React from "react";
import styles from "./styles.module.css";

export const DotsContainer = () => {
  return (
    <div className={styles.dotsBlock}>
      <Dots />
    </div>
  );
};
