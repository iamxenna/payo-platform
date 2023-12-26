import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import styles from "./styles.module.css";
import { UserInfo } from "Components/UserInfo/UserInfo";
import { IMerchantProfileData } from "Core/Merchant/MerchantEntity";
import { CSSTransition } from "react-transition-group";
interface MerchantUserInfoProps {
  userData: IMerchantProfileData;
}

export const MerchantUserInfo: FC<MerchantUserInfoProps> = ({ userData }) => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <div className={styles.userAvatarContainer} onMouseEnter={() => setIsShow(true)}>
        <div
          className={styles.userAvatar}
          style={{ backgroundImage: `url('${process.env.REACT_APP_API_HOST}${userData?.avatar}')` }}
        />
        <p className={classNames(styles.userName)}>{t("profile.header")}</p>
      </div>
      {isShow && (
        <CSSTransition
          in={isShow}
          classNames={{
            enterActive: "animate__animated animate__zoomIn",
            exitActive: "animate__animated animate__zoomOut",
          }}
          timeout={5000}
        >
          <div className={styles.userInfo} onMouseLeave={() => setIsShow(false)}>
            <UserInfo {...userData} isMerchant={true} />
          </div>
        </CSSTransition>
      )}
    </div>
  );
};
