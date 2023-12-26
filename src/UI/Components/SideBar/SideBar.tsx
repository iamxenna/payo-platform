import React, { memo } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "Core/store";
import { Logo } from "Components/Assets/Logo";
import Links from "./Links/Links";
import styles from "./styles.module.css";
import classNames from "classnames";
import { ResponsiveLogo } from "Components/Assets/ResponsiveLogo";
import { SideBarResponsive } from "Components/SideBarResponsive/SideBarResponsive";

const SideBar = memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigation = useHistory();
  const {
    store: {
      Profile: { avatar },
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
    Device: store.DeviceEntity,
  }));
  return (
    <>
      {isMobile && <SideBarResponsive />}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.logo} onClick={() => navigation.push("/showcase")}>
              <Logo />
            </div>
            <div className={styles.responsiveLogo}>
              <ResponsiveLogo />
            </div>
            <div className={styles.linksList}>
              <div className={styles.listWrapper}>
                <Links />
              </div>
            </div>
          </div>
          <Link to={"/profile"}>
            <div className={styles.userAvatarContainer}>
              <div
                className={styles.userAvatar}
                style={{ backgroundImage: `url('${process.env.REACT_APP_API_HOST}${avatar}')` }}
              />
              <p className={classNames(styles.userName, location.pathname === "/profile" && styles.listItemTextActive)}>
                {t("profile.header")}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
});

export default SideBar;
