import React, { useState } from "react";
import styles from "./styles.module.css";
import { USDC } from "Components/Assets/Tokens";
import { DangerCircle } from "Components/Assets/DangerCircle";
import { Tooltip } from "Components/Tooltip/Tooltip";
import { useTranslation } from "react-i18next";

export const MastercardSelector = () => {
  const { t } = useTranslation();
  const [show, setIsShow] = useState<boolean>(false);
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Visa/Mastercard</p>
      <div className={styles.container}>
        <USDC />
        <p className={styles.elTitle}>USDC/Polygon</p>
        <Tooltip isShow={show} text={t("updateProfile.anyPayments")} yPos={"top"} xPos={"right"}>
          <div onMouseOver={() => setIsShow(true)} onMouseOut={() => setIsShow(false)} className={styles.info}>
            <DangerCircle />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
