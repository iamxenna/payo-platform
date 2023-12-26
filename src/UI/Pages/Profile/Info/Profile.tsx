import classNames from "classnames";
import { useDispatch } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Logout } from "Components/Assets";
import { MetaMaskMini } from "Components/Assets/MetaMaskMini";
import { Button } from "Components/Button/Button";
import { CryptoBlock } from "Components/CryptoBlock/CryptoBlock";
import { UserInfo } from "Components/UserInfo/UserInfo";
import { useStore } from "Core/store";
import styles from "./styles.module.css";
import { DotsAsset } from "Components/Assets/dotsAsset";
import { EditModal } from "Components/Modals/EditModal/EditModal";
import { ContactInfo } from "Components/Modals/ContactInfo/ContactInfo";
import { CheckedProfileCard } from "Components/Assets/CheckedProfileCard";

export const Profile = () => {
  const dispatch = useDispatch();
  const {
    store: {
      Device: { isMobileLayoutForTablet, isMobile },
      Profile: { avatar, userName, email, website, socialNetworks, userType, tNumber, description, tokens },
      User: {
        wallet: { wallet },
      },
      UserTypes: { types },
      Showcase: { cards },
    },
    actions: {
      Profile: { clearProfile },
      Showcase: { clear: clearShowcase },
      Dashboard: { clear: clearDashboard },
    },
    asyncActions: {
      User: { logout },
      UserTypes: { getAllTypes },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
    User: store.UserEntity,
    Showcase: store.ShowcaseEntity,
    UserTypes: store.UserTypesEntity,
    Device: store.DeviceEntity,
  }));
  const navigation = useHistory();
  const { t } = useTranslation();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [openModel, setIsOpenModal] = useState<boolean>(false);

  const logoutClickHandler = () => {
    dispatch(logout());
    dispatch(clearProfile());
    dispatch(clearDashboard());
    dispatch(clearShowcase());
    navigation.push("/");
  };

  const walletData = useMemo(() => {
    if (!wallet) return "Connect Wallet";
    return `${wallet?.slice(0, 6)}...${wallet?.slice(wallet.length - 4, wallet.length)}`;
  }, [wallet]);

  useEffect(() => {
    if (types.length > 0) return;
    dispatch(getAllTypes());
  }, []);

  const HelpBlocks = useMemo(
    () => [
      {
        icon: "/assets/images/metamask.svg",
        title: "Connect your MetaMask wallet to get payments directly in your address. It takes 30 seconds",
        isChecked: !!wallet,
      },
      {
        icon: "/assets/images/gmail.svg",
        title: "Confirm your email address to avoid losing access to your account. Get a one-time password to confirm",
        isChecked: !!email,
      },
      {
        icon: "/assets/images/listCheck.svg",
        title: "Create an information card to accept payments in 3 clicks. Choose the product or donation type",
        isChecked: cards.length > 0,
      },
    ],
    [wallet, email, cards],
  );

  return (
    <div className={styles.wrapper}>
      <ContactInfo isVisible={openModel} socialNetworks={socialNetworks} setIsOpenModal={() => setIsOpenModal(false)} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.head}>{t("profile.header")}</h3>
          <div className={styles.btnBlock}>
            <div className={styles.mmButton}>
              <Button variant="primary" opClassName={classNames(styles.btnWrapper)} onClick={() => undefined}>
                {isMobile ? <MetaMaskMini width={"25"} height={"25"} /> : <MetaMaskMini width={"15"} height={"15"} />}
                <span className={styles.bl}>{walletData}</span>
              </Button>
            </div>
            {!isMobile && (
              <>
                <div className={styles.createBtnContainer}>
                  <Button
                    variant="gradient"
                    opClassName={classNames(styles.btnWrapper)}
                    onClick={() => navigation.push("/profile/update")}
                  >
                    {t("profile.editProfile")}
                  </Button>
                </div>
                <div className={styles.createBtnContainer}>
                  <Button variant="gradient" opClassName={classNames(styles.btnWrapper)} onClick={logoutClickHandler}>
                    <Logout /> {t("profile.logout")}
                  </Button>
                </div>
              </>
            )}
            {isMobile && (
              <div onClick={() => setIsModalShown(true)}>
                <DotsAsset />
              </div>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <UserInfo
              avatar={avatar}
              website={website || "website"}
              userName={userName}
              userType={userType}
              email={email || ""}
              tNumber={tNumber || "+999999999"}
              socialNetworks={socialNetworks}
              description={description || ""}
            />
            <div className={styles.tokenInfo}>
              <CryptoBlock variant="BNB" title={t("profile.binance")} enabledCryptos={tokens.binance} />
              <CryptoBlock variant="MATIC" title={t("profile.polygon")} enabledCryptos={tokens.polygon} />
            </div>
          </div>
          {!isMobileLayoutForTablet && !isMobile && (
            <div className={styles.helpBlocks}>
              {HelpBlocks.map(({ title, icon, isChecked }, idx) => (
                <div key={idx} className={styles.helpBlock}>
                  {isChecked && (
                    <div className={styles.checked}>
                      <CheckedProfileCard />
                    </div>
                  )}
                  <p className={styles.helpText}>{title}</p>
                  <div className={styles.image} style={{ backgroundImage: `url(${icon})` }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <EditModal
        close={() => setIsModalShown(false)}
        isVisible={isModalShown}
        setIsModalShown={() => setIsModalShown(false)}
        setIsOpenModal={() => setIsOpenModal(true)}
      />
    </div>
  );
};
