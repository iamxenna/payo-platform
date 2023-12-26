import React, { Dispatch, FC } from "react";
import styles from "Pages/Profile/Update/styles.module.css";
import { Input } from "Components/Input/Input";
import { Close } from "Components/Assets";
import Select, { Option } from "Components/Select/Select";
import { CryptoSelector } from "Components/CryptoSelector/CryptoSelector";
import { INetworkTokens } from "Core/Profile/ProfileEntity";
import { IProfileUpdateState } from "Pages/Profile/Update/ProfileUpdate.interfaces";
import { Button } from "Components/Button/Button";
import { useHistory } from "react-router-dom";
import { MastercardSelector } from "Components/MastercardSelector/MastercardSelector";

interface SettingsProps {
  updateState: IProfileUpdateState;
  setUpdateState: Dispatch<Partial<IProfileUpdateState>>;
  languages: string[];
  notification: string[];
  updateProfile: () => Promise<void>;
  connectWalletHandler(): void;
  onMMDeleteHandler(): void;
  tokenSelectChangeHandler(network: "binance" | "polygon", tokens: INetworkTokens[]): void;
}
export const AccountSettings: FC<SettingsProps> = ({
  updateState,
  languages,
  setUpdateState,
  notification,
  tokenSelectChangeHandler,
  onMMDeleteHandler,
  connectWalletHandler,
  updateProfile,
}) => {
  const location = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.accSettings}>
        <Input
          classWrapper={styles.accountInputWrapper}
          type="text"
          variant="default"
          title="Email"
          value={updateState.email}
          onChange={({ target }) => setUpdateState({ email: target.value })}
          placeholder={"ProfileName@payo.one"}
        />
        {updateState.wallet ? (
          <div className={styles.walletContainer}>
            <Input
              type="text"
              variant="default"
              title="Metamask wallet"
              value={`${updateState.wallet.slice(0, 6)}...${updateState.wallet.slice(
                updateState.wallet.length - 4,
                updateState.wallet.length,
              )}`}
              onChange={({ target }) => setUpdateState({ email: target.value })}
              disabled
              classWrapper={styles.extraWalletInput}
              onButtonClick={() => undefined}
              placeholder={"ProfileName@payo.one"}
            />
            <div className={styles.deleteWallet} onClick={onMMDeleteHandler}>
              <Close color="white" />
            </div>
          </div>
        ) : (
          <div className={styles.connectWalletBtn}>
            <span className={styles.connectWalletTitle}>Metamask wallet</span>
            <Button variant={"primary"} opClassName={styles.buttonContaier} onClick={connectWalletHandler}>
              Connect Wallet
            </Button>
          </div>
        )}

        <Select
          customClassName={styles.accountInputWrapper}
          value={updateState.notification}
          onChange={(value) => setUpdateState({ notification: value.toString() })}
          title={"Notifications"}
        >
          {notification.map((el, idx) => (
            <Option key={idx} value={el}>
              {el}
            </Option>
          ))}
        </Select>
        <Select
          value={updateState.language}
          onChange={(value) => setUpdateState({ language: value.toString() })}
          title={"Interface language"}
          disabled
        >
          {languages.map((el, idx) => (
            <Option key={idx} value={el}>
              {el}
            </Option>
          ))}
        </Select>
        <div className={styles.crypto}>
          <CryptoSelector
            enabledCryptos={updateState.tokens}
            tokenSwitchHandler={(value: INetworkTokens[]) => tokenSelectChangeHandler("binance", value)}
            nativeToken={"binance"}
          />
          <CryptoSelector
            enabledCryptos={updateState.tokens}
            tokenSwitchHandler={(value: INetworkTokens[]) => tokenSelectChangeHandler("polygon", value)}
            nativeToken={"polygon"}
          />
          <MastercardSelector />
        </div>
        <div className={styles.btnContainer}>
          <Button variant="primary" opClassName={styles.cancelBtn} onClick={() => location.goBack()}>
            Cancel
          </Button>
          <Button variant="primary" opClassName={styles.saveBtn} onClick={updateProfile}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
