import React, { ChangeEvent, Reducer, useEffect, useMemo, useReducer, useState } from "react";
import { Arrow } from "Components/Assets";
import { useHistory, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { IUpdateState } from "./CardUpdate.interfaces";
import { Button } from "Components/Button/Button";
import { Input } from "Components/Input/Input";
import { useTranslation } from "react-i18next";
import Select, { Option } from "Components/Select/Select";
import { Checkbox } from "Components/Checkbox/Checkbox";
import classNames from "classnames";
import { useStore } from "Core/store";
import { ICard, IGroup } from "Core/Showcase/ShowcaseEntity";
import { useDispatch } from "react-redux";
import { Share } from "Components/Assets/ShowcaseResponsive/Share";
import { ThunkResponse } from "Core/types/Interactor";
import { BackMobileArrow } from "Components/Assets/backMobileArrow";
import { useValidation, ValidationRules } from "hooks/useValidation";
import { useWindowSize } from "hooks/useWindowSize";

export const CardUpdate = () => {
  const location = useHistory();
  const dispatch = useDispatch();
  const {
    store: {
      Showcase: { cards, groups },
      Device: { isMobile },
      Profile: { email },
      User: {
        wallet: { wallet },
      },
    },
    asyncActions: {
      Showcase: { updateCard },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
    User: store.UserEntity,
    Showcase: store.ShowcaseEntity,
    Device: store.DeviceEntity,
  }));
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const windowSize = useWindowSize();

  const cardData = useMemo(() => {
    let possibleCard = cards.find((el: ICard) => el.id === +id);
    if (!possibleCard) {
      groups.forEach((group: IGroup) => {
        possibleCard = group.cards.find((el: ICard) => el.id === +id);
      });
    }
    return possibleCard;
  }, [cards, groups, id]);

  const {
    values: { title, photo, description, stock, price, groupId, isUnlimited },
    validate,
    validationDispatch,
    isSubmit,
    errors,
  } = useValidation(
    {
      title: cardData?.title || "",
      photo: cardData?.image || "",
      description: cardData?.description || "",
      groupId: cardData?.groupId || 0,
      price: cardData?.price?.toString() || "0",
      stock: cardData?.stock?.toString() || "0",
      isUnlimited: cardData?.isUnlimited || false,
    },
    {
      title: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.MAX.LENGTH(25)],
      photo: [ValidationRules.IS.IMAGE.VALID_SIZE(10000000), ValidationRules.IS.IMAGE.VALID_TYPE],
      description: [ValidationRules.MAX.LENGTH(500)],
      price: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.IS.DECIMAL.WITH_COMMA(6, 9)],
      stock: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.IS.NATURAL, ValidationRules.MAX.LENGTH(6)],
    },
  );

  const upload: string = useMemo(() => {
    if (window.innerWidth > 1415) {
      return "Upload photo";
    }
    return "";
  }, [windowSize]);

  const groupInfo = useMemo(() => {
    return groups.find((el) => el.id === groupId);
  }, [cardData, groupId]);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const image = useMemo(() => {
    if (!photo) {
      return "url('/assets/images/defaultCardInfo.png')";
    }
    return photo && imageFile ? `url(${photo})` : `url('${process.env.REACT_APP_API_HOST}${cardData?.image}')`;
  }, [photo, imageFile]);

  useEffect(() => {
    if (!email && !wallet) {
      location.push("/showcase");
    }
  }, []);

  useEffect(() => {
    if (!imageFile) return;
    validationDispatch({ photo: URL.createObjectURL(imageFile) });
  }, [imageFile]);

  const allowedGroups = useMemo(() => {
    const allGroups = [...groups];
    return allGroups.filter((el) => el.status.title !== "Archived");
  }, [groups]);

  const updateCardClickHandler = async () => {
    const request: { [key: string]: any } = {
      title: title,
      description: description,
      price: +price,
      stock: +stock,
      isUnlimited: isUnlimited,
    };

    if (groupId !== cardData?.groupId) {
      request.groupId = groupId;
    }

    if (groupId === 0) {
      request.groupId = null;
    }

    if (imageFile) {
      request["image"] = imageFile;
    }

    const data = await dispatch(
      updateCard({
        data: {
          id: +id,
          ...request,
        },
      }),
    );

    if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      location.push("/showcase");
    }
  };

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.mb} onClick={() => location.goBack()}>
          <BackMobileArrow />
        </div>
      ) : (
        <div className={styles.backBtn} onClick={() => location.goBack()}>
          <Arrow />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.showBoard}>
          <div className={styles.image} style={{ "--bg-image": image } as React.CSSProperties}></div>
          {!isMobile && (
            <div className={styles.updateInfo}>
              <p className={styles.name}>{title || "Name"}</p>
              <div className={styles.groupBlock}>
                <p className={styles.group}>#{cardData?.cardType.title}</p>
                {groupInfo && <p className={styles.group}>#{groupInfo.title}</p>}
              </div>
              <p className={styles.description}>
                {description.length >= 30 ? `${description.slice(0, 30)} more...` : description || "Description"}
              </p>
              <div className={styles.lastInfoBlock}>
                <div className={styles.priceContainer}>
                  <sup>$</sup>
                  <p className={styles.price}>{price || "999999.99"}</p>
                </div>
                <div className={styles.shareContainer}>
                  <Button variant="gradient" onClick={() => undefined} opClassName={styles.btn}>
                    <Share />
                    <span className={styles.ml}>Share Card</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.updateContainer}>
          <div className={styles.updateBlock}>
            <div className={styles.fstUpdateBlock}>
              <div className={styles.nameInputContainer}>
                <Input
                  id={"title"}
                  variant="default"
                  type="text"
                  value={title}
                  error={errors.titleError}
                  title={t("updateCard.nameTitle")}
                  onChange={validate}
                  placeholder={t("updateCard.namePlaceHolder")}
                  isImportant
                />
              </div>
              <div className={styles.fileInputContainer}>
                <Input
                  id={"photo"}
                  variant="file"
                  type="file"
                  value={photo}
                  error={errors.photoError}
                  onChange={(ev) => {
                    const res = validate(ev);
                    if (res) {
                      setImageFile((ev as ChangeEvent<HTMLInputElement>).target.files![0]);
                    }
                  }}
                  placeholder={upload}
                />
              </div>
            </div>
            <div>
              <Input
                id={"description"}
                variant="bigText"
                type="textarea"
                value={description}
                error={errors.descriptionError}
                title={t("updateCard.descriptionTitle")}
                placeholder={t("updateCard.descriptionPlaceHolder")}
                max={600}
                onChange={validate}
              />
            </div>
            <div className={styles.selectContainer}>
              <Select
                value={groupInfo?.title ?? "None"}
                onChange={(elem) => validationDispatch({ groupId: +elem })}
                title={t("updateCard.selectTitle")}
                disabled={allowedGroups.length === 0}
                withNone
              >
                {allowedGroups.map((el) => (
                  <Option key={el.id} value={el.id.toString()}>
                    {el.title}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.priceStockContainer}>
              <div className={styles.priceContainer}>
                <Input
                  id={"price"}
                  variant="default"
                  type="number"
                  isImportant
                  value={price}
                  error={errors.priceError}
                  title={title !== "Donation" ? "Price $" : "Minimum amount"}
                  placeholder={"1 - 999999.99"}
                  max={999999.99}
                  onChange={validate}
                />
                {isMobile && <p className={styles.commission}>Commission amount 1% = ${+price / 100}</p>}
              </div>
              {!isMobile && <p className={styles.commission}>Commission amount 1% = ${+price / 100}</p>}
              {cardData?.cardType.title === "Product" && (
                <div className={styles.stockContainer}>
                  <Input
                    id={"stock"}
                    variant="default"
                    type="number"
                    disabled={isUnlimited}
                    isImportant
                    value={stock}
                    error={errors.stockError}
                    title={t("updateCard.stockTitle")}
                    placeholder={"1 - 999999"}
                    max={999999}
                    onChange={validate}
                  />
                </div>
              )}
            </div>
            {cardData?.cardType.title === "Product" && (
              <div className={styles.unlimitedCheckboxContainer}>
                <Checkbox
                  isOn={isUnlimited}
                  opClassName={styles.check}
                  onClick={() => validationDispatch({ isUnlimited: !isUnlimited })}
                />
                <p>{t("updateCard.unlimited")}</p>
              </div>
            )}
          </div>
          <div className={styles.btnBlock}>
            <div className={styles.cancelContainer}>
              <Button
                onClick={() => location.goBack()}
                variant="primary"
                opClassName={classNames(styles.cancelBtn, styles.bd)}
              >
                {t("updateCard.cancel")}
              </Button>
            </div>
            <div className={styles.saveContainer}>
              <Button
                onClick={() => updateCardClickHandler()}
                disabled={!isSubmit}
                variant="primary"
                opClassName={styles.bd}
              >
                {t("updateCard.save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
