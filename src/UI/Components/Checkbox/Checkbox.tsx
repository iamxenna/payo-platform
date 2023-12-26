import classNames from "classnames";
import React, { FC, useMemo } from "react";
import { AcceptedTerms } from "Components/Assets/AcceptedTerms";
import { useStore } from "Core/store";
import styles from "./styles.module.css";

interface ICheckbox {
  isOn: boolean;
  opClassName?: string;
  isNegative?: boolean;
  onClick: () => void;
}

export const Checkbox: FC<ICheckbox> = ({ isOn, onClick, isNegative = false, opClassName = "" }) => {
  const {
    store: {
      Device: { isTablet, isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));

  const size = useMemo(() => {
    if (isMobile) {
      return "23";
    }
    if (isTablet) {
      return "11";
    }
    return "14";
  }, [isMobile, isTablet]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.checkboxImgContainer}>
        {isOn && (
          <span className={classNames(styles.imgContainer, opClassName)}>
            <AcceptedTerms width={size} isNegative={isNegative} height={size} />
          </span>
        )}
      </div>
      <input type="checkbox" onChange={onClick} checked={isOn} className={styles.checkbox} />
    </div>
  );
};
