import { Arrow, BackMobileArrow, Close } from "Components/Assets";
import { Button } from "Components/Button/Button";
import { CryptoSelector } from "Components/CryptoSelector/CryptoSelector";
import { Input } from "Components/Input/Input";
import { ConnectEmailModal } from "Components/Modals/ConnectEmailModal/ConnectEmailModal";
import Select, { Option } from "Components/Select/Select";
import { INetworkTokens, ISocialLinks } from "Core/Profile/ProfileEntity";
import { useStore } from "Core/store";
import { ThunkResponse } from "Core/types/Interactor";
import { HttpClient } from "libs/HttpClient";
import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { slIcons } from "utils/icons";
import { snChecker } from "utils/snChecker";
import { IProfileUpdateState } from "./ProfileUpdate.interfaces";
import styles from "./styles.module.css";
import classNames from "classnames";
import { AccountSettings } from "Pages/Profile/Update/UpdateResp/AccountSettings/AccountSettings";
import { MainInfo } from "Pages/Profile/Update/UpdateResp/MainInfo/MainInfo";
import { Notification } from "libs/Notification";
import { useWindowSize } from "hooks/useWindowSize";
import InjectedModule from "Modules/InjectedModule/InjectedModule";
import { MastercardSelector } from "Components/MastercardSelector/MastercardSelector";
import { Tooltip } from "Components/Tooltip/Tooltip";
import { DangerCircle } from "Components/Assets/DangerCircle";

export const ProfileUpdate = () => {
  const location = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    store: {
      Profile: { id, avatar, userName, description, userType, tNumber, socialNetworks, tokens, website, email },
      Device: { isMobile, isTablet, isMobileLayoutForTablet },
      User: {
        wallet: { wallet },
      },
      UserTypes: { types },
    },
    actions: {
      User: { setWallet },
    },
    asyncActions: {
      UserTypes: { getAllTypes },
      Profile: { updateProfile: UpdateProfileCore },
    },
  } = useStore((state) => ({
    Profile: state.ProfileEntity,
    User: state.UserEntity,
    UserTypes: state.UserTypesEntity,
    Device: state.DeviceEntity,
    Wallet: state.UserEntity,
  }));

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [isUpdateEmailModal, setIsUpdateEmailModal] = useState<boolean>(false);
  const [addLinkData, setAddLinkData] = useState<{ name: string; link: string }>({ name: "", link: "" });
  const [isAccountSettings, setIsAccountSettings] = useState<boolean>(true);
  const windowSize = useWindowSize();
  const [show, setIsShow] = useState<boolean>(false);

  const [updateState, setUpdateState] = useReducer(
    (oldState: IProfileUpdateState, newState: Partial<IProfileUpdateState>): IProfileUpdateState => ({
      ...oldState,
      ...newState,
    }),
    {
      avatar: `${process.env.REACT_APP_API_HOST}${avatar}`,
      userName: userName,
      description: description || "",
      type: userType.title,
      tNumber: tNumber || "",
      website: website || "",
      socialNetworks: socialNetworks,
      email: email || "",
      wallet: wallet || "",
      notification: "Turn it all",
      language: "English",
      tokens: tokens,
    },
  );

  const updateProfile = useCallback(async () => {
    if (!updateState.email) {
      Notification.error("You need to сonnect email to use the platform");
      return;
    }
    if (!updateState.wallet) {
      Notification.error("You need to сonnect wallet to use the platform");
      return;
    }
    if (updateState.email !== email) {
      const { data } = await HttpClient.post("/user/sendVerification", {
        wallet: wallet,
        email: updateState.email,
      });
      if (data.status === "Success") {
        setIsUpdateEmailModal(true);
        return;
      }
    }
    const dData = await dispatch(
      UpdateProfileCore({
        data: {
          id: id,
          ...updateState,
          userTypeId: types.find((el) => el.title === updateState.type)?.id,
          avatar: imageFile ?? undefined,
          tokens: JSON.stringify(updateState.tokens),
          socialNetworks: JSON.stringify(updateState.socialNetworks),
        },
      }),
    );
    if ((dData as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      location.push("/profile");
    }
  }, [updateState, imageFile]);

  useEffect(() => {
    if (!imageFile) return;
    setUpdateState({ avatar: URL.createObjectURL(imageFile) });
  }, [imageFile]);

  useEffect(() => {
    if (types.length > 0) return;
    dispatch(getAllTypes());
  }, []);

  const tokenSelectChangeHandler = (network: "binance" | "polygon", tokens: INetworkTokens[]) => {
    const oldTokens = { ...updateState.tokens };
    oldTokens[network] = tokens;
    setUpdateState({ tokens: oldTokens });
  };

  const snAddHandler = useCallback(() => {
    if (updateState.socialNetworks.length >= 5) return;
    if (!/^https:\/\/.{0,}$/.test(addLinkData.link)) return;
    if (!addLinkData.name || !addLinkData.link) return;
    const newSn: ISocialLinks = {
      type: snChecker(addLinkData.link) || "else",
      title: addLinkData.name,
      network: addLinkData.link,
    };
    const oldNetworks = [...updateState.socialNetworks];
    oldNetworks.push(newSn);
    setUpdateState({ socialNetworks: oldNetworks });
  }, [addLinkData, updateState]);

  const upload: string = useMemo(() => {
    if (window.innerWidth > 1740) {
      return "Upload photo";
    }
    return "";
  }, [windowSize]);

  const deleteLink = useCallback(
    (idx: number) => {
      const oldNetworks = [...updateState.socialNetworks];
      oldNetworks.splice(idx, 1);
      setUpdateState({ socialNetworks: oldNetworks });
    },
    [addLinkData, updateState],
  );

  const connectWalletHandler = useCallback(async () => {
    const { wallet, provider, network } = await InjectedModule.connectWallet();
    setUpdateState({ wallet: wallet });
    dispatch(setWallet({ wallet, provider, network }));
  }, []);

  const buttonClickHandler = useCallback(async () => {
    console.log(password);
    const { data } = await HttpClient.post("/user/verifyEmail", {
      wallet,
      email: updateState.email,
      password,
    });
    if (data.status === "Success") {
      const dData = await dispatch(
        UpdateProfileCore({
          data: {
            id: id,
            ...updateState,
            userTypeId: types.find((el) => el.title === updateState.type)?.id,
            avatar: imageFile ?? undefined,
            tokens: JSON.stringify(updateState.tokens),
            socialNetworks: JSON.stringify(updateState.socialNetworks),
          },
        }),
      );
      if ((dData as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
        setIsUpdateEmailModal(false);
        location.push("/profile");
      }
    } else {
      Notification.error("Code is invalid");
    }
  }, [password, setPassword, dispatch, email]);

  const notification = ["Turn it all", "Only transactions", "Only news", "Disable all"];
  const languages = ["English", "Japanese"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.backBtn}>
        {isTablet || isMobile || isMobileLayoutForTablet ? (
          <div className={styles.head}>
            <div className={styles.backArrow} onClick={() => location.goBack()}>
              <BackMobileArrow />
            </div>
            <div className={styles.btnHeadBlock}>
              <div className={styles.settingsContainer}>
                <Button
                  onClick={() => setIsAccountSettings(true)}
                  variant="primary"
                  opClassName={classNames(styles.bd, !isAccountSettings && styles.bdActive)}
                >
                  {t("updateProfile.accSettings")}
                </Button>
              </div>
              <div className={styles.infoContainer}>
                <Button
                  onClick={() => setIsAccountSettings(false)}
                  variant="primary"
                  opClassName={classNames(styles.bd, isAccountSettings && styles.bdActive, styles.infoContainer)}
                >
                  {t("updateProfile.mainInfo")}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div onClick={() => location.goBack()} className={styles.icon}>
            <Arrow />
          </div>
        )}
      </div>
      {(isTablet || isMobile || isMobileLayoutForTablet) && isAccountSettings ? (
        <AccountSettings
          updateProfile={updateProfile}
          updateState={updateState}
          setUpdateState={setUpdateState}
          connectWalletHandler={connectWalletHandler}
          onMMDeleteHandler={() => {
            if (!updateState.email) return Notification.error("Connect your email to change the wallet");
            setUpdateState({ wallet: "" });
          }}
          languages={languages}
          notification={notification}
          tokenSelectChangeHandler={(network: "binance" | "polygon", tokens: INetworkTokens[]) =>
            tokenSelectChangeHandler(network, tokens)
          }
        />
      ) : (isTablet || isMobile || isMobileLayoutForTablet) && !isAccountSettings ? (
        <MainInfo
          updateState={updateState}
          setUpdateState={setUpdateState}
          types={types}
          addLinkData={addLinkData}
          setAddLinkData={setAddLinkData}
          updateProfile={updateProfile}
          setImageFile={setImageFile}
          deleteLink={deleteLink}
          snAddHandler={snAddHandler}
        />
      ) : (
        <div className={styles.container}>
          <div className={styles.accSettings}>
            <div
              className={styles.avatar}
              style={{ "--bg-image": `url('${updateState.avatar}')` } as React.CSSProperties}
            />
            <p className={styles.title}>{t("updateProfile.accSettings")}</p>
            <Input
              classWrapper={styles.accountInputWrapper}
              type="email"
              variant="default"
              title="Email"
              value={updateState.email}
              disabled={!updateState.wallet}
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
                  placeholder={"ProfileName@payo.one"}
                />
                <div
                  className={styles.deleteWallet}
                  onClick={() => {
                    if (!updateState.email) return Notification.error("Connect your email to change the wallet");
                    setUpdateState({ wallet: "" });
                  }}
                >
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
          </div>
          <div className={styles.mainInfo}>
            <p className={styles.title}>{t("updateProfile.mainInfo")}</p>
            <div className={styles.userNAvatar}>
              <div className={styles.userName}>
                <Input
                  type="text"
                  variant="default"
                  title="Username"
                  value={updateState.userName}
                  onChange={({ target }) => setUpdateState({ userName: target.value })}
                  placeholder={"Type a username"}
                  isImportant
                  max={16}
                  min={1}
                  isUsername
                />
              </div>
              <div className={styles.fileInputContainer}>
                <Input
                  type="file"
                  variant="file"
                  value={updateState.avatar}
                  onChange={({ target }: any) => setImageFile(target.files[0])}
                  placeholder={upload}
                />
              </div>
            </div>
            <Input
              type="text"
              variant="bigText"
              title="About"
              value={updateState.description}
              max={600}
              onChange={({ target }) => setUpdateState({ description: target.value })}
              placeholder={"Type a description"}
            />
            <Select
              value={updateState.type}
              title={"Type of user"}
              onChange={(value) => setUpdateState({ type: value.toString() })}
            >
              {types.map(({ id, title }) => (
                <Option key={id} value={title}>
                  {title}
                </Option>
              ))}
            </Select>
            <div className={styles.tNumber}>
              <Input
                type="text"
                variant="default"
                title="Phone number"
                value={updateState.tNumber}
                onChange={({ target }) => setUpdateState({ tNumber: target.value })}
                placeholder={"Type your number"}
              />
            </div>
            <Input
              type="text"
              variant="default"
              title="Website"
              value={updateState.website}
              onChange={({ target }) => setUpdateState({ website: target.value })}
              isLink
              placeholder={"https://"}
            />
            <div className={styles.addLinkContainer}>
              <Input
                classWrapper={styles.inputWrapper}
                type="text"
                variant="default"
                title="Social Networks"
                value={addLinkData.name}
                onChange={({ target }) => setAddLinkData((prev) => ({ ...prev, name: target.value }))}
                placeholder={"Enter link name"}
              />
              <Input
                classWrapper={styles.inputWrapper}
                type="text"
                variant="default"
                value={addLinkData.link}
                onChange={({ target }) => setAddLinkData((prev) => ({ ...prev, link: target.value }))}
                placeholder={"Enter link URL"}
                isLink
              />
              <Button variant="primary" opClassName={styles.addBtn} onClick={snAddHandler}>
                Add
              </Button>
            </div>
            <div className={styles.snContainer}>
              {updateState.socialNetworks.map(({ type, title }, idx) => (
                <div className={styles.snUnit}>
                  <div className={styles.snContent}>
                    <div className={styles.link}>{slIcons[type as keyof typeof slIcons]()}</div>{" "}
                    <p className={styles.snTitle}>{title}</p>
                  </div>
                  <div onClick={() => deleteLink(idx)} style={{ cursor: "pointer" }}>
                    <Close />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.btnContainer}>
              <Button variant="primary" opClassName={styles.cancelBtn} onClick={() => location.goBack()}>
                Cancel
              </Button>
              <Button
                variant="primary"
                opClassName={styles.saveBtn}
                disabled={
                  !updateState.userName ||
                  !/^[a-z0-9]{0,}$/.test(updateState.userName) ||
                  (!!updateState.website && !/^https:\/\/.{0,}$/.test(updateState.website))
                }
                onClick={updateProfile}
              >
                Save
              </Button>
              {/* <div className={styles.dotsBlock}>
                <DotsContainer />
              </div> */}
            </div>
          </div>
          <div className={styles.crypto}>
            <div className={styles.currncyBlock}>
              <p className={styles.title}>{t("updateProfile.crypto")}</p>
              <Tooltip isShow={show} text={t("updateProfile.chooseCurrency")} yPos={"bottom"} xPos={"right"}>
                <div onMouseOver={() => setIsShow(true)} onMouseOut={() => setIsShow(false)} className={styles.info}>
                  <DangerCircle />
                </div>
              </Tooltip>
            </div>
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
        </div>
      )}
      {isUpdateEmailModal && (
        <ConnectEmailModal
          email={updateState.email}
          password={password}
          setPassword={setPassword}
          buttonClickHandler={buttonClickHandler}
          close={() => {
            setUpdateState({ email: email || "" });
            setPassword("");
            setIsUpdateEmailModal(false);
          }}
        />
      )}
    </div>
  );
};
