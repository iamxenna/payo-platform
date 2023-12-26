import classNames from "classnames";
import React, { FC } from "react";
import { BottomModalWrapper } from "../BottomModalWrapper/BottomModalWrapper";
import { IOption } from "../CardOptionsModal/CardOptionsModal.interfaces";

import styles from "./styles.module.css";

interface UnitOptionModalProps {
  isVisible: boolean;
  close(): void;
  options: IOption[];
}

export const UnitOptionModal: FC<UnitOptionModalProps> = ({ isVisible, close, options }) => {
  return (
    <BottomModalWrapper isVisible={isVisible} close={close}>
      <div className={styles.itemsWrapper}>
        {options.map((props, idx) => {
          if (props.onMobile === false) return;
          return (
            <div key={idx} className={styles.itemContainer} onClick={props.onClick}>
              <p className={classNames(styles.item, props.isRed && styles.isRed)}>{props.title}</p>
            </div>
          );
        })}
      </div>
    </BottomModalWrapper>
  );
};
