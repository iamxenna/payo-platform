import React, { FC, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import { tokens } from "utils/icons";
import { Counter } from "Components/Counter/Counter";
import { Input } from "Components/Input/Input";
import Select, { Option } from "Components/Select/Select";
import { ICard } from "Core/Showcase/ShowcaseEntity";
import styles from "./styles.module.css";
import { CheckoutModalState } from "./CheckoutModal.interfaces";
import { Button } from "Components/Button/Button";
import { useStore } from "Core/store";
import { BackMobileArrow, CloseBig, Failed, Success } from "Components/Assets";
import { useClickOutside } from "hooks/useClickOutside";
import { IProfileRaw } from "Core/Profile/ProfileRepository";
import { ThunkResponse } from "Core/types/Interactor";
import { RegexpValidator } from "libs/Validation/RegexpValidator";
import { BNB } from "Components/Assets/Tokens";
import { DollarAsset } from "Components/Assets/Tokens/DollarAsset";
import { Tooltip } from "Components/Tooltip/Tooltip";
import { DangerCircle } from "Components/Assets/DangerCircle";
import WertModule from "Modules/WertModule/WertModule";
import { WertModal } from "./WertModal/WertModal";
import { useValidation, ValidationRules } from "hooks/useValidation";

interface CheckoutProps {
  isOpen: boolean;
  cardInfo: ICard;
  profile: IProfileRaw;
  close(): void;
  type: "crypto" | "mastercard" | null;
}

export const CheckoutModal: FC<CheckoutProps> = ({ cardInfo, profile, close, isOpen, type }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(1);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [show, setIsShow] = useState<boolean>(false);
  const [wertModal, setWertModal] = useState<boolean>(false);
  const [minimumTooltipAmount, setMinimumTooltipAmount] = useState<boolean>(false);

  const {
    store: {
      CardType: { types },
      Rates: { rates },
      Transfer: { txStatus, txLoading },
      Merchant: { profile: MerchantProfile },
      Device: { isMobile },
    },
    actions: {
      Transfer: { setTxStatus },
    },
    asyncActions: {
      Merchant: { getCard },
      CardTypes: { getCardTypes },
      Transfer: { transact },
    },
  } = useStore((store) => ({
    Merchant: store.MerchantEntity,
    CardType: store.CardTypesEntity,
    Rates: store.RatesEntity,
    Transfer: store.TransferEntity,
    Device: store.DeviceEntity,
  }));

  const {
    values: { currency, network, donationAmount, email, comment },
    validate,
    validationDispatch,
    isSubmit,
    errors,
  } = useValidation(
    {
      currency: "BNB",
      network: "BSC",
      donationAmount: "",
      email: "",
      comment: "",
    },
    {
      currency: [],
      network: [],
      donationAmount: [
        ValidationRules.REQUIRED.OPTIONAL(cardInfo.cardType.title !== "Donation"),
        ValidationRules.MIN.VALUE(cardInfo.price),
        ValidationRules.IS.DECIMAL.WITH_COMMA(6, 9),
      ],
      email: [ValidationRules.IS.EMAIL, ValidationRules.REQUIRED.ALWAYS],
      comment: [ValidationRules.MAX.LENGTH(500)],
    },
  );

  const nativeTokens: { [key: string]: string } = {
    BSC: "BNB",
    Polygon: "MATIC",
  };

  const choosenTokens = useMemo(() => {
    if (network === "BSC") {
      return [nativeTokens[network], ...profile.tokens.binance].filter((el) => el !== currency);
    } else {
      return [nativeTokens[network], ...profile.tokens.polygon].filter((el) => el !== currency);
    }
  }, [network]);

  const value = useMemo(() => {
    switch (type) {
      case "crypto":
        if (!rates) return 0;
        if (cardInfo.cardType.title === "Donation") {
          return +(+donationAmount / rates[currency as keyof typeof rates]).toFixed(4);
        }
        return +((cardInfo.price * amount) / rates[currency as keyof typeof rates]).toFixed(4);
      case "mastercard":
        if (cardInfo.cardType.title === "Donation") {
          return +(+donationAmount).toFixed(4);
        }
        return +(cardInfo.price * amount).toFixed(4);
      default:
        return 0;
    }
  }, [amount, cardInfo, donationAmount, currency]);

  useEffect(() => {
    if (types.length !== 0) return;
    dispatch(getCardTypes());
  }, [types]);

  const purchaseData = useMemo(() => {
    if (!txStatus) return;
    return {
      title: t(`purchase.header${txStatus}`),
      image: txStatus === "Success" ? <Success /> : <Failed />,
      message: t(`purchase.message${txStatus}`),
      textFirstPart: t(`purchase.text${txStatus}FirstPart`),
      textSecondPart: t(`purchase.text${txStatus}SecondPart`),
      btnText: t(`purchase.btn${txStatus}`),
    };
  }, [txStatus]);

  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      close();
    }
  });

  const imgLink = useMemo(() => {
    return cardInfo?.image
      ? `${process.env.REACT_APP_API_HOST}${cardInfo.image}`
      : "/assets/images/defaultCardInfo.png";
  }, [cardInfo]);

  const onNetworkChangeHandler = useCallback(
    (value: string | number) => {
      validationDispatch({ network: value.toString(), currency: nativeTokens[value] });
    },
    [currency, network, nativeTokens],
  );

  const payClickHandler = useCallback(async () => {
    if (type === "mastercard") {
      setWertModal(true);
      return;
    }
    const data = await dispatch(
      transact({
        data: {
          network: network,
          currency: currency,
          token: currency,
          to: MerchantProfile?.email || "",
          toAddress: MerchantProfile?.wallet || "",
          amount: value,
          cardName: cardInfo.title,
          cardTypeId: cardInfo.cardType.id,
          from: email,
          comment: comment,
          quantity: amount,
        },
      }),
    );
    if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      dispatch(getCard({ id: +cardInfo.id }));
    }
  }, [network, currency, email, comment, amount, donationAmount, cardInfo]);
  if (txStatus) {
    return (
      <div className={styles.wrapper}>
        <div className={classNames(styles.container, styles.purchaseContainer)} ref={modalRef}>
          <div className={styles.purcHeading}>
            <p className={styles.purcTitle}>{purchaseData?.title}</p>
            <div className={styles.purcClose} onClick={close}>
              <CloseBig />
            </div>
          </div>
          <div className={styles.purcImage}>{purchaseData?.image}</div>
          <div className={styles.purcMessageContainer}>
            <p className={styles.purcMessage}>{purchaseData?.message}</p>
            <p className={styles.purcText}>{purchaseData?.textFirstPart}</p>
            <p className={styles.purcText}>{purchaseData?.textSecondPart}</p>
          </div>
          <div className={styles.purcBtnContainer}>
            <Button variant={"gradient"} opClassName={styles.purcButton} onClick={() => dispatch(setTxStatus(null))}>
              {purchaseData?.btnText}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CSSTransition
      in={isOpen}
      classNames={{
        enterActive: "animate__animated animate__zoomIn",
        exitActive: "animate__animated animate__zoomOut",
      }}
      unmountOnExit
      timeout={5000}
    >
      <div className={styles.wrapper}>
        <div className={styles.container} ref={modalRef}>
          {!wertModal ? (
            <div>
              <div className={styles.unitInfo}>
                <div className={styles.header}>
                  {isMobile && (
                    <div className={styles.close} onClick={close}>
                      <BackMobileArrow />
                    </div>
                  )}
                  <p className={styles.heading}>Checkout</p>
                  {!isMobile && (
                    <div className={styles.close} onClick={close}>
                      <CloseBig />
                    </div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <div className={styles.img} style={{ backgroundImage: `url(${imgLink})` }} />
                  <div className={styles.data}>
                    <p className={styles.name}>{cardInfo.title}</p>
                    {cardInfo.cardType.id !== types.find((el) => el.title === "Donation")?.id ? (
                      <>
                        <p className={styles.price}>$ {cardInfo.price}</p>
                        {!cardInfo.isUnlimited && cardInfo.stock && (
                          <div>
                            <Counter amount={amount} setAmount={setAmount} maxAmount={cardInfo.stock} />
                          </div>
                        )}
                        {!cardInfo.isUnlimited && <p className={styles.stock}>{cardInfo.stock} available</p>}
                      </>
                    ) : (
                      <Input
                        id={"donationAmount"}
                        variant={"default"}
                        type={"number"}
                        title={"Donation amount"}
                        value={donationAmount}
                        error={errors.donationAmountError}
                        onChange={validate}
                        placeholder={`min $${cardInfo.price < 5 ? "5" : cardInfo.price}`}
                        isImportant
                      />
                    )}
                  </div>
                </div>
                {type === "crypto" && (
                  <div className={styles.netCur}>
                    <Select
                      value={network}
                      title="Network"
                      customWrapperClassName={styles.select}
                      onChange={onNetworkChangeHandler}
                    >
                      <Option value={"BSC"}>BSC</Option>
                      <Option value={"Polygon"}>Polygon</Option>
                    </Select>
                    <Select
                      value={
                        <div className={styles.dropCurrency}>
                          {tokens[currency]} {currency}
                        </div>
                      }
                      title="Currency"
                      customWrapperClassName={styles.select}
                      onChange={(value) => validationDispatch({ currency: value.toString() })}
                    >
                      {choosenTokens.map((el, idx) => (
                        <Option key={idx} value={el} extraSymbol={tokens[el]!}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  </div>
                )}
                <div className={styles.email}>
                  <Input
                    id={"email"}
                    variant="default"
                    type={"email"}
                    value={email}
                    onChange={validate}
                    title={"Email"}
                    error={errors.emailError}
                    placeholder={"Type an email"}
                    isImportant
                  />
                </div>
                <div className={styles.comment}>
                  <Input
                    id={"comment"}
                    variant="bigText"
                    type={"text"}
                    value={comment}
                    onChange={validate}
                    title={"Comment"}
                    error={errors.commentError}
                    placeholder={"Type а comment"}
                    max={600}
                  />
                </div>
              </div>
              <div className={styles.border} />
              <div className={styles.buyResult}>
                <div className={styles.leftSideResult}>
                  <p className={styles.resultAmount}>{amount} piece</p>
                  <div className={styles.result}>
                    {type === "crypto" ? tokens[currency] : <DollarAsset />}
                    <p className={styles.resultValue}>{value || "0"}</p>
                    {type === "mastercard" && (
                      <Tooltip
                        opClassName={styles.info}
                        yPos={"top"}
                        xPos={"left"}
                        text={t("cardInfo.wertInfo")}
                        isShow={show}
                      >
                        <div
                          onMouseOver={() => setIsShow(true)}
                          onMouseOut={() => setIsShow(false)}
                          className={styles.info}
                        >
                          <DangerCircle />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <Tooltip
                  yPos={"bottom"}
                  opClassName={styles.minimumAmountTooltip}
                  xPos={"right"}
                  text={t("cardInfo.minimumAmount")}
                  isShow={minimumTooltipAmount}
                >
                  <div
                    className={styles.btnPayWrapper}
                    onMouseEnter={() => {
                      if (type === "mastercard" && value < 5) {
                        setMinimumTooltipAmount(true);
                      }
                    }}
                    onMouseLeave={() => setMinimumTooltipAmount(false)}
                  >
                    <Button
                      variant="gradient"
                      opClassName={styles.btnPay}
                      isLoading={txLoading}
                      disabled={!isSubmit || value < 5}
                      onClick={payClickHandler}
                    >
                      {t("cardInfo.pay")}
                    </Button>
                  </div>
                </Tooltip>
              </div>
            </div>
          ) : (
            <WertModal value={value} address={MerchantProfile?.wallet as string} />
          )}
        </div>
      </div>
    </CSSTransition>
  );
};
