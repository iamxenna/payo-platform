import React, { FC, useMemo, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.css";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useClickOutside } from "hooks/useClickOutside";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";
import { HELP_MENU, SOCIAL_NETWORKS } from "Components/Modals/HelpModalMobile/HelpModalMobile.constants";

interface ShareProps {
  isVisible: boolean;
  close(): void;
}
export const HelpModalMobile: FC<ShareProps> = ({ isVisible, close }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  const outsideClickHandler = () => close();

  const theme = useMemo(() => {
    // return location.pathname === "/" ? "light" : "dark";
    return location.pathname === "/" ? "dark" : "light";
  }, [location.pathname]);

  const links = useMemo(() => {
    return SOCIAL_NETWORKS(theme);
  }, [location.pathname]);

  const help = useMemo(() => {
    return HELP_MENU(theme);
  }, [location.pathname]);

  useClickOutside(ref, outsideClickHandler);
  return (
    <CSSTransition
      in={isVisible}
      classNames={{
        exitActive: "animate__animated animate__fadeOutRight",
        enterActive: "animate__animated animate__fadeInRight",
      }}
      unmountOnExit
      timeout={5000}
    >
      <div className={styles.wrapper}>
        <div className={classNames(styles.content, theme === "dark" ? styles.bgDark : styles.light)} ref={ref}>
          <div onClick={() => close()}>
            <ExportBackArrow />
          </div>
          <div className={styles.topContent}>
            {help.map(({ text, icon, border }, idx) => (
              <div
                className={classNames(
                  styles.topElem,
                  theme === "light" ? styles.tDark : styles.tLight,
                  border && styles.borderBottom,
                )}
                key={idx}
              >
                <div className={styles.icon}>{icon}</div>
                <p>{t(text)}</p>
              </div>
            ))}
          </div>
          <div className={styles.bottomContent}>
            <div className={styles.linkContainer}>
              {links.map(({ icon, link }, idx) => (
                <div key={idx} className={styles.linkIcon} onClick={() => window.open(link, "_blank")}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
