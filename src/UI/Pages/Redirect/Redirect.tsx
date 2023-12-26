import React, { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LogoRedirect } from "Components/Assets";
import styles from "./styles.module.css";
import { Button } from "Components/Button/Button";

export const Redirect = () => {
  const location = useLocation();
  const navigation = useHistory();

  const link = useMemo(() => {
    return location.search.split("?url=")[1];
  }, []);

  const linkClickHandler = () => {
    window.open(link, "_blank");
    // navigation.goBack();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <LogoRedirect />
        <p className={styles.text}>
          You are now leaving our site. We are not responsible for the content of external websites.
          <br /> Please proceed at your own risk.
        </p>
        <p className={styles.link} onClick={linkClickHandler}>
          {link}
        </p>
        <div className={styles.btn}>
          <Button variant="gradient" opClassName={styles.opBtnClass} onClick={() => navigation.push("/showcase")}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};
