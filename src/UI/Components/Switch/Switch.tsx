import React, { FC, useMemo } from "react";
import styles from "./styles.module.css";

interface SwitchProps {
  isOn: boolean;
  toggle(): void;
}

export const Switch: FC<SwitchProps> = ({ isOn, toggle }) => {
  const id = useMemo(() => {
    return Math.random();
  }, [toggle]);
  return (
    <>
      <input checked={isOn} className={styles.checkbox} id={`react-switch-${id}`} type="checkbox" onChange={toggle} />
      <label
        className={styles.label}
        style={isOn ? { background: "#413068" } : { background: "#93989C" }}
        htmlFor={`react-switch-${id}`}
      >
        <span className={styles.button} />
      </label>
    </>
  );
};
