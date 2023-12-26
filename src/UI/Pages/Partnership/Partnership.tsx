import { useTranslation } from "react-i18next";
import { Button } from "Components/Button/Button";
import styles from "./styles.module.css";

export const Partnership = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.partnershipContainer}>
        <h1 className={styles.title}>{t("partnership.title")}</h1>
        <p className={styles.text}>{t("partnership.textBody")}</p>
        <Button
          variant="gradient"
          opClassName={styles.button}
          onClick={() =>
            window.open("https://murphywl.notion.site/Partnership-e7604cf71afe4eefb240ca35dbd655a7", "_blank")
          }
        >
          {t("partnership.btnText")}
        </Button>
      </div>
    </div>
  );
};
