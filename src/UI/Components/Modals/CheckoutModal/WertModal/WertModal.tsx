import WertModule from "Modules/WertModule/WertModule";
import React, { FC, useEffect, useMemo } from "react";
import styles from "./styles.module.css";

interface WertModalProps {
  value: number;
  address: string;
}

export const WertModal: FC<WertModalProps> = ({ value, address }) => {
  const WertInstance = useMemo(() => {
    return new WertModule(+value, address);
  }, [value, address]);

  useEffect(() => {
    WertInstance.mount();

    return () => {
      WertInstance.unmount();
    };
  }, []);
  return <div id="wert_module" className={styles.wrapper}></div>;
};
