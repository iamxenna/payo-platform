import React, { useEffect, useMemo } from "react";
import styles from "./styles.module.css";
import { Button } from "Components/Button/Button";
import { MetaMask } from "Components/Assets/MetaMask";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "Core/store";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Input } from "Components/Input/Input";
import { Arrow } from "Components/Assets";
import { PayoMobile } from "Components/Assets/PayoMobile";
import { BackArrow } from "Components/Assets/BackArrow";
import { Notification } from "libs/Notification";
import { RegexpValidator } from "libs/Validation/RegexpValidator";

export const Index = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useHistory();

  const [emailConnectState, setEmailConnectState] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(60);

  const {
    store: {
      User: { token },
      Device: { isMobile },
    },
    asyncActions: {
      User: { authByEmail, authByWallet, verifyPassword },
    },
  } = useStore((store) => ({
    User: store.UserEntity,
    Device: store.DeviceEntity,
  }));

  useEffect(() => {
    if (token) {
      navigation.push("/showcase");
    }
  }, [token]);

  const authByWalletHandler = () => {
    dispatch(authByWallet({ walletName: "MetaMask" }));
  };

  useEffect(() => {
    if (emailConnectState !== 3) return;
    setResendTimer(60);
    let i = 60;
    function decrease() {
      setTimeout(() => {
        setResendTimer((prev) => prev - 1);
        i--;
        if (i > 0) {
          decrease();
        }
      }, 1000);
    }
    decrease();
  }, [emailConnectState]);

  const authByEmailHandler = () => {
    dispatch(authByEmail({ email: email }));
    Notification.warning("The code was sent to your email");
    setEmailConnectState(3);
  };

  const emailLoginPart = useMemo(() => {
    switch (emailConnectState) {
      case 1:
        return (
          <Button variant="secondary" onClick={() => setEmailConnectState(2)}>
            {t("connectEmail")}
          </Button>
        );
      case 2:
        return (
          <Input
            variant="emailInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onButtonClick={authByEmailHandler}
            classButton={styles.btnInput}
            classWrapper={styles.secondary}
            placeholder=""
            withButton={email.length > 0 && !isMobile}
          />
        );
      case 3:
        return (
          <Input
            variant="emailInput"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onButtonClick={() => dispatch(verifyPassword({ email: email, password: +password }))}
            classButton={styles.btnInput}
            classWrapper={styles.secondary}
            placeholder=""
            max={7}
            withoutValidation
            withButton={password.length > 0 && !isMobile}
          />
        );
    }
  }, [emailConnectState, email, password]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            {emailConnectState === 3 && !isMobile ? (
              <div className={styles.exitArrow} onClick={() => setEmailConnectState(2)}>
                <Arrow />
              </div>
            ) : (
              emailConnectState === 3 &&
              isMobile && (
                <div className={styles.exitArrowMobile} onClick={() => setEmailConnectState(2)}>
                  <BackArrow />
                </div>
              )
            )}
            {isMobile ? (
              <PayoMobile />
            ) : (
              <>
                <h1>{t("connect")}</h1>
                {emailConnectState !== 3 && <p className={styles.textDescription}>{t("advantage")}</p>}
              </>
            )}
          </div>
          <div className={styles.btnContainer}>
            {emailConnectState !== 3 && (
              <div className={styles.btn}>
                <Button variant="primary" onClick={authByWalletHandler}>
                  <MetaMask opClassName={styles.metamaskLogo} />
                </Button>
              </div>
            )}
            <div>{emailLoginPart}</div>
            {emailConnectState !== 3 && (
              <div className={styles.checkboxContainer}>
                <p className={styles.terms}>
                  {t("terms")}{" "}
                  <span
                    className={styles.underline}
                    onClick={() =>
                      window.open(
                        "https://murphywl.notion.site/Terms-and-Privacy-4e6ed097b9384bab82345c15457e5ce2",
                        "_blank",
                      )
                    }
                  >
                    {t("termsTitle")}
                  </span>
                  .
                </p>
              </div>
            )}
            {emailConnectState === 3 && (
              <div className={styles.checkboxContainer}>
                {resendTimer > 0 ? (
                  <p className={styles.terms}>
                    {t("resend")} {resendTimer} {t("seconds")}
                  </p>
                ) : (
                  <p className={styles.termsResend} onClick={authByEmailHandler}>
                    {t("resendCode")}
                  </p>
                )}
              </div>
            )}
            {emailConnectState === 3 && isMobile && password.length === 6 && (
              <div
                className={styles.sendButton}
                onClick={() => dispatch(verifyPassword({ email: email, password: +password }))}
              >
                <p className={styles.sendButtonLabel}>Send code</p>
              </div>
            )}
            {emailConnectState === 2 && isMobile && RegexpValidator("email", email) && (
              <div className={styles.sendButtonAbsolute} onClick={authByEmailHandler}>
                <p className={styles.sendButtonLabel}>Request code</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
