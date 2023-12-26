import React, { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./styles.module.css";

import type { OptionProps, SelectProps } from "./Select.interfaces";
import { SelectArrow } from "Components/Assets/SelectArrow";

export const Option: React.FC<OptionProps> = ({ value, children, extraSymbol }) => (
  <li data-select-value={value}>
    {extraSymbol}
    {children}
  </li>
);

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  customClassName,
  customWrapperClassName,
  title,
  disabled = false,
  isCenter = false,
  withNone = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectWrapperNode = useRef<HTMLDivElement>(null);

  const localChildren = useMemo(() => {
    if (!withNone) {
      return children;
    }
    return [
      <li key={+value!} data-select-value={"0"} value={"0"}>
        None
      </li>,
      ...children,
    ];
  }, [withNone, children]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      if (target.hasAttribute("data-select-value")) {
        (localChildren as { props: { value: string } }[]).forEach((el) => {
          if (el.props.value === target.getAttribute("data-select-value")) {
            onChange(target.getAttribute("data-select-value") as string);
          }
        });
        setIsOpen(!isOpen);
      }
      if (selectWrapperNode.current?.contains(target as Node)) {
        setIsOpen(!isOpen);
      }
      if (!selectWrapperNode.current?.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [isOpen, disabled]);

  return (
    <div className={customWrapperClassName}>
      {title && <p className={styles.title}>{title}</p>}
      <div
        className={classNames(
          styles.wrapper,
          disabled && styles.disabled,
          customClassName,
          styles.icon[(disabled ? styles.disabled : "", isOpen ? styles.rotated : "") as any],
        )}
        ref={selectWrapperNode}
      >
        <label
          className={classNames(styles.label, {
            [styles.isCenter]: isCenter,
          })}
        >
          {value}
        </label>
        <SelectArrow />
        <CSSTransition
          in={isOpen}
          timeout={200}
          unmountOnExit
          classNames={{
            enter: styles["alert-enter"],
            enterActive: styles["alert-enter-active"],
            exit: styles["alert-exit"],
            exitActive: styles["alert-exit-active"],
          }}
        >
          <ul className={styles.options}>{localChildren}</ul>
        </CSSTransition>
      </div>
    </div>
  );
};

export default Select;
