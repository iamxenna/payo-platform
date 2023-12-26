import classNames from "classnames";
import MiniLogo from "Components/Assets/MiniLogo";
import { Question } from "Components/Assets/Question";
import { HelpModalMobile } from "Components/Modals/HelpModalMobile/HelpModalMobile";
import SupportModal from "Components/Modals/SupportModal/SupportModal";
import { useStore } from "Core/store";
import { useClickOutside } from "hooks/useClickOutside";
import { useRef } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { SOCIAL_NETWORKS, HELP_MENU } from "./HelpCircle.constants";

import styles from "./styles.module.css";

interface IHelpCircle {
  type: "dark" | "light";
}

export const HelpCircle: FC<IHelpCircle> = ({ type }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));

  const outsideClickHandler = () => setIsShowMenu(false);

  const theme = useMemo(() => {
    return location.pathname === "/" ? "light" : "dark";
  }, [location.pathname]);

  const links = useMemo(() => {
    return SOCIAL_NETWORKS(theme);
  }, [location.pathname]);

  const help = useMemo(() => {
    return HELP_MENU(theme);
  }, [location.pathname]);

  const helpClickHandler = (link?: string) => {
    if (!link) {
      setIsSupportOpen(true);
      return;
    }
    window.open(link, "_blank");
  };

  useClickOutside(ref, outsideClickHandler);
  return (
    <div className={styles.wrapper}>
      <SupportModal isOpen={isSupportOpen} setIsOpen={(value = false) => setIsSupportOpen(value)} />
      {isShowMenu && !isMobile && (
        <div className={classNames(styles.menuContainer, theme === "dark" ? styles.bgDark : styles.light)} ref={ref}>
          <div className={styles.topContent}>
            {help.map(({ text, icon, link }, idx) => (
              <div
                className={classNames(styles.topElem, theme === "light" ? styles.tDark : styles.tLight)}
                onClick={() => helpClickHandler(link)}
                key={idx}
              >
                {icon}
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
            <p className={classNames(styles.powered, theme === "light" ? styles.tDark : styles.tLight)}>
              Powered by{" "}
              <span className={styles.logoContainer}>
                <MiniLogo color={theme === "light" ? "#100C1A" : "#F9F6FF"} />
              </span>
            </p>
          </div>
        </div>
      )}
      <HelpModalMobile isVisible={isShowMenu && isMobile} close={() => setIsShowMenu(false)} />
      <div
        className={classNames(styles.container, type === "dark" ? styles.dark : styles.light)}
        onClick={() => setIsShowMenu(true)}
      >
        <Question color={type === "dark" ? "#F9F6FF" : ""} />
      </div>
    </div>
  );
};
