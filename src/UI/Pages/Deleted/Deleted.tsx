import { Button } from "Components/Button/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";
export const Deleted = () => {
  const navigation = useHistory();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.notFoundIcon} />
        <div className={styles.textContainer}>
          <h1 className={styles.heading}>{t("notFound.whoops")}</h1>
          <p className={styles.bodyText}>
            {t("notFound.notAccessible")} {t("notFound.contact")}
          </p>
          <div className={styles.btn}>
            <Button variant="primary" opClassName={styles.btnOpClass} onClick={() => navigation.push("/showcase")}>
              {t("notFound.back")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
