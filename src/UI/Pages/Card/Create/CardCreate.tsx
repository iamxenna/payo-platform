import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Button } from "Components/Button/Button";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { Input } from "Components/Input/Input";
import Select, { Option } from "Components/Select/Select";
import { Tabs } from "Components/Tabs/Tabs";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { ICardCreateRequest } from "Core/Showcase/ShowcaseRepository";
import { Share } from "Components/Assets/ShowcaseResponsive/Share";
import { ThunkResponse } from "Core/types/Interactor";
import { BackMobileArrow } from "Components/Assets/backMobileArrow";
import { useWindowSize } from "hooks/useWindowSize";
import { ValidationRules, useValidation } from "hooks/useValidation";

export const CardCreate = () => {
  const dispatch = useDispatch();
  const navigation = useHistory();

  const {
    store: {
      Showcase: { groups },
      CardTypes: { types },
      Device: { isMobile },
      Profile: { email },
      User: {
        wallet: { wallet },
      },
    },
    asyncActions: {
      Showcase: { createCard },
    },
  } = useStore((store) => ({
    User: store.UserEntity,
    Profile: store.ProfileEntity,
    Showcase: store.ShowcaseEntity,
    CardTypes: store.CardTypesEntity,
    Device: store.DeviceEntity,
  }));

  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const windowSize = useWindowSize();

  const upload: string = useMemo(() => {
    if (window.innerWidth > 1415) {
      return "Upload photo";
    }
    return "";
  }, [windowSize]);

  const cardTypeData = useMemo(() => {
    return types.find((el) => el.id === tab);
  }, [tab, types]);

  const {
    values: { title, photo, description, stock, price, groupId, isUnlimited },
    validate,
    validationDispatch,
    isSubmit,
    errors,
  } = useValidation(
    {
      title: "",
      photo: "",
      description: "",
      price: "",
      stock: "",
      groupId: 0,
      isUnlimited: false,
    },
    {
      title: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.MAX.LENGTH(25)],
      photo: [ValidationRules.IS.IMAGE.VALID_SIZE(10000000), ValidationRules.IS.IMAGE.VALID_TYPE],
      description: [ValidationRules.MAX.LENGTH(500)],
      price: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.IS.DECIMAL.WITH_COMMA(6, 9)],
      stock: [
        ValidationRules.REQUIRED.OPTIONAL(cardTypeData?.title === "Donation"),
        ValidationRules.IS.NATURAL,
        ValidationRules.MAX.LENGTH(6),
      ],
    },
  );

  useEffect(() => {
    if (!email && !wallet) {
      navigation.push("/showcase");
    }
  }, []);

  const groupIdQuery = useMemo(() => {
    return +location.search.split("?group=")[1];
  }, [location]);

  useEffect(() => {
    if (groupIdQuery !== 0) {
      validationDispatch({ groupId: groupIdQuery });
    }
  }, [groupIdQuery]);

  useEffect(() => {
    if (!imageFile) return;
    validationDispatch({ photo: URL.createObjectURL(imageFile) });
  }, [imageFile]);

  const image = useMemo(() => {
    return photo ? `url('${photo}')` : "url('/assets/images/defaultCardInfo.png')";
  }, [photo]);

  const filteredGroups = useMemo(() => {
    return groups.filter((el) => el.status.title !== "Archived");
  }, [groups]);

  const groupData = useMemo(() => {
    return groups.find((el) => el.id === groupId);
  }, [groupId]);

  const cardCreateHandler = async () => {
    const data: ICardCreateRequest = {
      title: title,
      image: imageFile,
      description: description,
      price: +price,
      stock: +stock,
      cardTypeId: cardTypeData?.id || 1,
      isUnlimited: isUnlimited,
    };
    if (groupId > 0) {
      data["groupId"] = groupId;
    }
    const dData = await dispatch(
      createCard({
        data,
      }),
    );
    if ((dData as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      if (groupId) {
        return navigation.push(`/group/${groupId}`);
      }
      navigation.push("/showcase");
    }
  };

  return (
    <div className={styles.wrapper}>
      {isMobile && (
        <div className={styles.mb}>
          <div onClick={() => navigation.goBack()}>
            <BackMobileArrow />
          </div>
          <Tabs tabs={types} active={tab} onClick={(elem) => setTab(elem)} />
        </div>
      )}
      {!isMobile && <Tabs tabs={types} active={tab} onClick={(elem) => setTab(elem)} />}
      <div className={styles.content}>
        <div className={styles.showBoard}>
          <div className={styles.image} style={{ "--bg-image": image } as React.CSSProperties}></div>
          {!isMobile && (
            <div className={styles.updateInfo}>
              <p className={styles.name}>{title || "Name"}</p>
              <div className={styles.tagBlock}>
                <p className={styles.group}>#{cardTypeData?.title}</p>
              </div>
              <p className={styles.description}>
                {description.length >= 30 ? `${description.slice(0, 30)} more...` : description || "Description"}
              </p>
              <div className={styles.lastInfoBlock}>
                <div className={styles.priceContainer}>
                  <sup>$</sup>
                  <p className={styles.price}>{price || "0.0"}</p>
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
                value={groupData?.title ?? "None"}
                onChange={(elem) => validationDispatch({ groupId: +elem })}
                title={t("updateCard.selectTitle")}
                disabled={filteredGroups.length === 0}
                withNone
              >
                {filteredGroups?.map((el) => (
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
                  title={cardTypeData?.title !== "Donation" ? "Price $" : "Minimum amount"}
                  placeholder={"1 - 999999.99"}
                  max={999999.99}
                  onChange={validate}
                />
                {isMobile && <p className={styles.commission}>Commission amount 1% = ${(+price * 1) / 100}</p>}
              </div>
              {!isMobile && <p className={styles.commission}>Commission amount 1% = ${(+price * 1) / 100}</p>}
              {cardTypeData?.title === "Product" && (
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
                    onChange={validate}
                  />
                </div>
              )}
            </div>
            {cardTypeData?.title === "Product" && (
              <div className={styles.unlimitedCheckboxContainer}>
                <Checkbox
                  isOn={isUnlimited}
                  onClick={() => validationDispatch({ isUnlimited: !isUnlimited })}
                  opClassName={styles.checkbox}
                />
                <p>{t("updateCard.unlimited")}</p>
              </div>
            )}
          </div>
          <div className={styles.btnBlock}>
            <div className={styles.cancelContainer}>
              <Button
                onClick={() => navigation.goBack()}
                variant="primary"
                opClassName={classNames(styles.cancelBtn, styles.bd)}
              >
                {t("updateCard.cancel")}
              </Button>
            </div>
            <div className={styles.saveContainer}>
              <Button
                onClick={() => cardCreateHandler()}
                disabled={!isSubmit}
                variant="primary"
                opClassName={styles.bd}
              >
                {t("createCard.create")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
