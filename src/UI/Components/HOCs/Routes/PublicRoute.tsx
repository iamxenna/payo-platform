import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useStore } from "Core/store";
import SideBar from "Components/SideBar/SideBar";
import { HelpCircle } from "Components/HelpCircle/HelpCircle";
import { Cookie, COOKIE_KEYS } from "libs/Cookie";
import { IRoutes } from "Constants/Routes";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import { useUpdateTitle } from "hooks/useUpdateTitle";

type PublicRouteProps = Omit<IRoutes, "isProtected">;

export const PublicRoute: FC<PublicRouteProps> = ({ page, layoutType, title, withHelp }) => {
  const dispatch = useDispatch();
  const navigation = useHistory();

  useUpdateTitle(title);

  const {
    store: {
      User: { token: storeJwtToken },
      Profile: { userName },
      Device: { isMobile },
    },
    asyncActions: {
      Profile: { getProfile },
      User: { checkUser, logout },
      CardTypes: { getCardTypes },
    },
  } = useStore((store) => ({
    User: store.UserEntity,
    Profile: store.ProfileEntity,
    CardTypes: store.CardTypesEntity,
    Device: store.DeviceEntity,
  }));

  // useEffect(() => {
  //   if (storeJwtToken) return;
  //   const token = Cookie.get(COOKIE_KEYS.JWT_TOKEN);
  //   if (!token && location.pathname !== "/") {
  //     navigation.push("/");
  //     dispatch(logout());
  //   }
  //   dispatch(checkUser());
  // }, []);

  // Bug here
  useEffect(() => {
    if (userName) return;
    dispatch(getProfile());
    dispatch(getCardTypes());
  }, [storeJwtToken]);

  return (
    <div className={styles.wrapper}>
      {layoutType === "default" && <SideBar />}
      <div className={styles.content}>{page}</div>
      {withHelp && <HelpCircle type={location.pathname === "/" && !isMobile ? "light" : "dark"} />}
    </div>
  );
};
