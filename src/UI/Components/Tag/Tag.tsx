import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface TagProps {
  children: React.ReactNode;
  underscored?: boolean;
  classWrapper?: string;
}

export const Tag: FC<TagProps> = ({ children, classWrapper = "", underscored = true }) => {
  return (
    <div className={classNames(styles.container, classWrapper, underscored && styles.underscoredText)}>
      <p className={styles.text}>{children}</p>
    </div>
  );
};
