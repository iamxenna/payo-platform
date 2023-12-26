import classNames from "classnames";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { generateElements } from "./Links.constants";

import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { generateMobileElements } from "Components/SideBarResponsive/Links/Links.constants";

const Links = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));

  const ELEMENTS = useMemo(() => {
    if (isMobile) {
      return generateMobileElements(location.pathname, isMobile);
    }
    return generateElements(location.pathname, isMobile);
  }, [location.pathname, isMobile]);

  return (
    <ul className={styles.list}>
      {ELEMENTS.map(({ icon, path, title }, idx) => {
        const isActive = location.pathname === path;
        return (
          <li key={idx}>
            <Link to={path} className={styles.linkItem}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>{icon}</div>
                {isActive && <div className={styles.bar} />}
              </div>
              <span className={classNames(styles.listItemText, isActive && styles.listItemTextActive)}>
                {t(`sidebar.${title}`)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Links;
