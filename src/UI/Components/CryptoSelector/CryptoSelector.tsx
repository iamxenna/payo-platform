import { INetworkTokens } from "Core/Profile/ProfileEntity";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Switch } from "Components/Switch/Switch";
import styles from "./styles.module.css";
import { tokens } from "utils/icons";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { useStore } from "Core/store";
import { ConfirmModal } from "Components/Modals/ConfirmModal/ConfirmModal";

interface CryptoSelectorProps {
  nativeToken: "polygon" | "binance";
  enabledCryptos: { binance: INetworkTokens[]; polygon: INetworkTokens[] };
  tokenSwitchHandler(value: INetworkTokens[]): void;
}

export const CryptoSelector: FC<CryptoSelectorProps> = ({ nativeToken, enabledCryptos, tokenSwitchHandler }) => {
  const { t } = useTranslation();
  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));
  const nTokens = {
    polygon: "MATIC",
    binance: "BNB",
  };

  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const allowedToken = useMemo(
    () => [nTokens[nativeToken], "USDT", "USDC", "BUSD", "DAI"],
    [nativeToken, enabledCryptos],
  );

  const switchClickHandler = useCallback(
    (el: string, validate = true) => {
      const oldTokensArray = [...enabledCryptos[nativeToken]];
      if (oldTokensArray.includes(el as INetworkTokens)) {
        disableHandler(oldTokensArray, el, validate);
      } else {
        oldTokensArray.push(el as INetworkTokens);
      }
      tokenSwitchHandler(oldTokensArray);
    },
    [nTokens, enabledCryptos, allowedToken],
  );

  const disableHandler = (oldTokensArray: INetworkTokens[], el: string, validate = true) => {
    const idx = oldTokensArray.indexOf(el as INetworkTokens);
    if (validate && el === "USDC" && nativeToken === "polygon") {
      setConfirmModal(true);
      return;
    }
    oldTokensArray.splice(idx, 1);
    setConfirmModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(`profile.${nativeToken}`)}</p>
      <div className={styles.container}>
        {allowedToken.map((el, idx) => {
          const isOn = enabledCryptos[nativeToken].find((elC) => elC === el);
          return (
            <div key={idx} className={classNames(styles.optionUnit, isMobile && styles[`el${idx}`])}>
              <div className={styles.unitContainer}>
                {tokens[el as keyof typeof tokens]}
                <p className={styles.elTitle}>{el}</p>
              </div>
              {idx !== 0 && <Switch isOn={!!isOn} toggle={() => switchClickHandler(el)} />}
            </div>
          );
        })}
      </div>
      {confirmModal && (
        <ConfirmModal
          text={
            <p className={styles.modalText}>
              {t("profile.disableUSDC")}
              <br />
              {t("profile.willBeUnavailable")}
            </p>
          }
          onAccept={() => switchClickHandler("USDC", false)}
          onReject={() => setConfirmModal(false)}
        />
      )}
    </div>
  );
};
