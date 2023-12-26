import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import classNames from "classnames";
import React, { FC } from "react";
import { Share } from "Components/Assets";
import { Tag } from "Components/Tag/Tag";
import { ISocialLinks } from "Core/Profile/ProfileEntity";
import { slIcons } from "utils/icons";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { ProfileShareMobile } from "Components/Assets/ProfileShareMobile";

interface UserInfoProps {
  userName: string;
  avatar: string;
  userType: {
    id: number;
    title: string;
  };
  email: string | null;
  tNumber: string | null;
  website?: string | null;
  socialNetworks: ISocialLinks[];
  description: string | null;
  isMerchant?: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({
  userName,
  avatar,
  userType,
  email,
  tNumber,
  website,
  socialNetworks,
  description,
  isMerchant = false,
}) => {
  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));
  const { t } = useTranslation();
  return (
    <>
      <div className={classNames(styles.wrapper, isMerchant && styles.descriptionWithoutBorder)}>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.mainInfo}>
              <div
                className={styles.avatar}
                style={{ "--bg-image": `url("${process.env.REACT_APP_API_HOST}${avatar}")` } as React.CSSProperties}
              />
              <div className={styles.userData}>
                <div className={styles.fstBlock}>
                  <h1 className={styles.name}>{userName}</h1>
                  <div className={styles.tagContainer}>
                    <Tag underscored={false}>{userType.title}</Tag>
                  </div>
                </div>
                <div className={styles.scdBlock}>
                  <p>{email}</p>
                </div>
                <div className={styles.thrdBlock}>
                  <p>{tNumber}</p>
                </div>
                {website && (
                  <Link to={`/redirect?url=${website}`} target="_blank">
                    <div className={styles.ftBlock}>
                      {isMobile ? <ProfileShareMobile /> : <Share color={"#413068"} />}
                      <p className={styles.ml}>{website}</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
            {!isMobile && (
              <div className={styles.socialNets}>
                {socialNetworks.map(({ title, type, network }, idx) => (
                  <Link to={`/redirect?url=${network}`} target="_blank">
                    <div key={idx} className={styles.snContent}>
                      <div className={styles.snIcon}>{slIcons[type as keyof typeof slIcons]()}</div>
                      <h1 className={styles.socialNetItem}>{title}</h1>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {!isMobile && (
            <div className={styles.descriptionWrapper}>
              <h2 className={styles.aboutTitle}>{t("about")}</h2>
              <h4 className={styles.description}>{description ? description : "Here will be you description"}</h4>
            </div>
          )}
        </div>
      </div>
      {isMobile && (
        <div className={classNames(styles.descriptionWrapper, isMerchant && styles.descriptionWithoutBorder)}>
          <h2 className={styles.aboutTitle}>{t("about")}</h2>
          <h4 className={styles.description}>{description ? description : "Here will be you description"}</h4>
        </div>
      )}
    </>
  );
};
