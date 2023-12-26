import React, { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { TooltipTriangle } from "Components/Assets/TooltipTriangle";

interface TooltipProps {
  children: ReactNode;
  yPos: "top" | "bottom";
  xPos: "left" | "right";
  text: string;
  isShow: boolean;
  opClassName?: string;
}
export const Tooltip: FC<TooltipProps> = ({ children, opClassName = "", yPos, xPos, text, isShow }) => {
  return (
    <div className={styles.wrapper}>
      {isShow && (
        <div
          className={classNames(
            styles.popupContainer,
            opClassName,
            xPos === "left" ? styles.left : styles.right,
            yPos === "top" ? styles.top : styles.bottom,
          )}
        >
          <p className={styles.text}>{text}</p>
          <div
            className={classNames(
              styles.triangle,
              xPos === "left" ? styles.leftTriangle : styles.rightTriangle,
              yPos === "top" ? styles.topTriangle : styles.bottomTriangle,
            )}
          >
            <TooltipTriangle />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
