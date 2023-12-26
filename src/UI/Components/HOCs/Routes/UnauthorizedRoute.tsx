import React, { FC } from "react";
import { IRoutes } from "Constants/Routes";
import styles from "./styles.module.css";
import SideBar from "Components/SideBar/SideBar";
import { HelpCircle } from "Components/HelpCircle/HelpCircle";

type UnauthorizedRouteProps = Omit<IRoutes, "isProtected">;

export const UnauthorizedRoute: FC<UnauthorizedRouteProps> = ({ layoutType, withHelp, page }) => {
  return (
    <div className={styles.wrapper}>
      {layoutType === "default" && <SideBar />}
      <div className={styles.content}>{page}</div>
      {withHelp && <HelpCircle type={location.pathname === "/" ? "light" : "dark"} />}
    </div>
  );
};
