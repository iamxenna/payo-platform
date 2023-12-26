import React, { ChangeEvent, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useStore } from "Core/store";
import { Input } from "Components/Input/Input";
import { Button } from "Components/Button/Button";
import { ThunkResponse } from "Core/types/Interactor";
import { ICreateState } from "./GroupCreate.interfaces";
import { Share } from "Components/Assets/ShowcaseResponsive/Share";
import { BackMobileArrow } from "Components/Assets/backMobileArrow";

import styles from "./styles.module.css";
import { useWindowSize } from "hooks/useWindowSize";
import { useValidation, ValidationRules } from "hooks/useValidation";

export const GroupCreate = () => {
  const { t } = useTranslation();
  const navigation = useHistory();
  const dispatch = useDispatch();
  const {
    store: {
      Device: { isMobile },
      Profile: { email },
      User: {
        wallet: { wallet },
      },
    },
    asyncActions: {
      Showcase: { createGroup },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
    User: store.UserEntity,
    Showcase: store.ShowcaseEntity,
    Device: store.DeviceEntity,
  }));
  const {
    values: { title, photo },
    validate,
    validationDispatch,
    isSubmit,
    errors,
  } = useValidation(
    {
      title: "",
      photo: "",
    },
    {
      title: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.MAX.LENGTH(25)],
      photo: [ValidationRules.IS.IMAGE.VALID_SIZE(10000000), ValidationRules.IS.IMAGE.VALID_TYPE],
    },
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const windowSize = useWindowSize();

  const upload: string = useMemo(() => {
    if (window.innerWidth > 1150) {
      return "Upload photo";
    }
    return "";
  }, [windowSize]);

  useEffect(() => {
    if (!email && !wallet) {
      navigation.push("/showcase");
    }
  }, []);

  useEffect(() => {
    if (!imageFile) return;
    validationDispatch({ photo: URL.createObjectURL(imageFile) });
  }, [imageFile]);

  const image = useMemo(() => {
    return photo ? `url('${photo}')` : "url('/assets/images/defaultGroupInfo.png')";
  }, [photo]);

  const groupCreationHandler = useCallback(async () => {
    const data = await dispatch(
      createGroup({
        data: {
          title: title,
          image: imageFile,
        },
      }),
    );
    if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      navigation.push("/showcase");
    }
  }, [isSubmit, title, imageFile]);

  const buttonBlock = useMemo(() => {
    return (
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
          <Button onClick={() => groupCreationHandler()} disabled={!isSubmit} variant="primary" opClassName={styles.bd}>
            {t("createCard.create")}
          </Button>
        </div>
      </div>
    );
  }, [isSubmit, imageFile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {isMobile && (
          <div className={styles.mb}>
            <div onClick={() => navigation.goBack()}>
              <BackMobileArrow />
            </div>
          </div>
        )}
        <div className={styles.showBoard}>
          <div className={styles.image} style={{ "--bg-image": image } as React.CSSProperties}></div>
          {!isMobile && (
            <div className={styles.updateInfo}>
              <p className={styles.name}>{title || "Name"}</p>
              <div className={styles.tagBlock}>
                <p className={styles.group}>#group</p>
              </div>
              <div className={styles.lastInfoBlock}>
                <div className={styles.priceContainer}>
                  <p className={styles.price}>0 cards</p>
                </div>
                <div className={styles.shareContainer}>
                  <Button variant="gradient" onClick={() => undefined} opClassName={styles.btn}>
                    <Share />
                    <span className={styles.ml}>Share group</span>
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
          </div>
          {!isMobile && buttonBlock}
        </div>
      </div>
      {isMobile && <div>{buttonBlock}</div>}
    </div>
  );
};
