import React, { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "Components/Button/Button";
import { Tag } from "Components/Tag/Tag";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { CheckoutModal } from "Components/Modals/CheckoutModal/CheckoutModal";
import { MerchantUserInfo } from "Components/MerchantUserInfo/MerchantUserInfo";
import { useWindowSize } from "hooks/useWindowSize";

interface CardInfoParams {
  id: string;
  userName: string;
}

export const MerchantCard: FC = () => {
  const { t } = useTranslation();
  const { id, userName } = useParams<CardInfoParams>();
  const dispatch = useDispatch();
  const location = useHistory();
  const {
    store: {
      Merchant: { card, profile },
    },
    actions: {
      Merchant: { clearMerchantData },
    },
    asyncActions: {
      Merchant: { getCard },
      CardTypes: { getCardTypes },
    },
  } = useStore((store) => ({
    Merchant: store.MerchantEntity,
    CardType: store.CardTypesEntity,
  }));
  const [type, setType] = useState<"crypto" | "mastercard" | null>(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    dispatch(getCard({ id: +id }));
    dispatch(getCardTypes());
    return () => {
      dispatch(clearMerchantData());
    };
  }, [id]);

  useEffect(() => {
    if (!profile) return;
    if (userName !== profile?.userName) {
      location.push("/deleted");
    }
  }, [profile]);

  const cryptoButtonText = useMemo(() => {
    if (window.innerWidth < 920) {
      return "Crypto";
    }
    return "Pay via Crypto";
  }, [windowSize]);

  const mastercardButtonText = useMemo(() => {
    if (window.innerWidth < 920) {
      return "Visa/Mastercard";
    }
    return "Pay via Visa/Mastercard";
  }, [windowSize]);

  const imgLink = useMemo(() => {
    return card?.image ? `${process.env.REACT_APP_API_HOST}${card.image}` : "/assets/images/defaultCardInfo.png";
  }, [card]);

  return (
    <div className={styles.wrapper}>
      <MerchantUserInfo userData={profile!} />
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <div className={styles.img} style={{ "--bg-image": `url("${imgLink}")` } as React.CSSProperties} />
        </div>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>{card?.title}</h1>
            <div className={styles.tagBlock}>
              <Tag>#{card?.cardType?.title}</Tag>
              {/* {card && <Tag>{card}</Tag>} */}
            </div>
            <div className={styles.descrBlock}>
              <p className={styles.description}>{card?.description}</p>
            </div>
          </div>
          <div>
            <div className={styles.infoContainer}>
              <p className={styles.priceTitle}>{t("cardInfo.price")}:</p>
              <h3 className={styles.price}>${card?.price}</h3>
              {!card?.isUnlimited && card?.cardType?.title !== "Donation" && (
                <p className={styles.stock}>
                  {t("cardInfo.inStock")}: {card?.stock}
                </p>
              )}
            </div>
            <div className={styles.btnWrapper}>
              <div className={styles.btnContainer}>
                <Button
                  variant="gradient"
                  opClassName={styles.buyButton}
                  onClick={() => {
                    setType("crypto");
                  }}
                >
                  <span className={styles.btnLabel}>{cryptoButtonText}</span>
                </Button>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  variant="gradient"
                  opClassName={styles.buyButton}
                  onClick={() => {
                    setType("mastercard");
                  }}
                >
                  <span className={styles.btnLabel}>{mastercardButtonText}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {type && (
          <CheckoutModal type={type} isOpen={!!type} cardInfo={card!} profile={profile!} close={() => setType(null)} />
        )}
      </div>
    </div>
  );
};
