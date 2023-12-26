import React, { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "Components/Input/Input";
import styles from "./styles.module.css";
import { CloseBig } from "Components/Assets";
import { useStore } from "Core/store";
import { Button } from "Components/Button/Button";

interface ConnectEmailModalProps {
  email: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  buttonClickHandler(): void;
  close(): void;
}

export const ConnectEmailModal: FC<ConnectEmailModalProps> = ({
  email,
  password,
  setPassword,
  buttonClickHandler,
  close,
}) => {
  const { t } = useTranslation();
  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.close} onClick={close}>
          <CloseBig />
        </div>
        <div className={styles.content}>
          <h1>{t("connectEmail")}</h1>
          <div className={styles.textBlock}>
            <p className={styles.text}>Please enter the code sent to</p>
            <p className={styles.text}>{email}</p>
          </div>
          <Input
            variant={"emailInput"}
            type={"number"}
            value={password}
            classWrapper={styles.input}
            onChange={({ target }) => setPassword(target.value)}
            placeholder={""}
            onButtonClick={buttonClickHandler}
            max={7}
            withoutValidation
          />
          {password.length > 0 && (
            <Button
              variant={"primary"}
              disabled={password.length !== 6}
              opClassName={styles.sendButtonAbsolute}
              onClick={buttonClickHandler}
            >
              <p className={styles.sendButtonLabel}>Send code</p>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
