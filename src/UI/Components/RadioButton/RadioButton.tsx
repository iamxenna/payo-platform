import React, { FC } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Radio } from "Components/Assets/Radio";

interface RadioProps {
  isOn: boolean;
  opClassName?: string;
  onClick: () => void;
}
export const RadioButton: FC<RadioProps> = ({ isOn, onClick, opClassName = "" }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.checkboxImgContainer}>
          {isOn && (
            <span className={classNames(styles.imgContainer, opClassName)}>
              <Radio />
            </span>
          )}
        </div>
        <input type="checkbox" onChange={onClick} checked={isOn} className={styles.checkbox} />
      </div>
    </div>
  );
};
