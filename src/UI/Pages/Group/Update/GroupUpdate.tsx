import classNames from "classnames";
import { Button } from "Components/Button/Button";
import { Input } from "Components/Input/Input";
import React, { ChangeEvent, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { IUpdateState } from "./GroupUpdate.interfaces";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import * as process from "process";
import { useDispatch } from "react-redux";
import { Share } from "Components/Assets/ShowcaseResponsive/Share";
import { ThunkResponse } from "Core/types/Interactor";
import { useValidation, ValidationRules } from "hooks/useValidation";

export const GroupUpdate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useHistory();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    store: {
      Showcase: { groups },
      Profile: { email },
      User: {
        wallet: { wallet },
      },
    },
    asyncActions: {
      Showcase: { updateGroup },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
    User: store.UserEntity,
    Showcase: store.ShowcaseEntity,
  }));

  useEffect(() => {
    if (!email && !wallet) {
      location.push("/showcase");
    }
  }, []);

  const {
    values: { title, groupPhoto },
    validate,
    validationDispatch,
    isSubmit,
    errors,
  } = useValidation(
    {
      title: "",
      groupPhoto: "",
    },
    {
      title: [ValidationRules.REQUIRED.ALWAYS, ValidationRules.MAX.LENGTH(25)],
      groupPhoto: [ValidationRules.IS.IMAGE.VALID_SIZE(10000000), ValidationRules.IS.IMAGE.VALID_TYPE],
    },
  );

  const groupData = useMemo(() => {
    const data = groups.find((el) => el.id === +id);
    if (data) {
      validationDispatch({ title: data.title, groupPhoto: data.image });
    }
    return data;
  }, [id]);

  useEffect(() => {
    if (!imageFile) return;
    validationDispatch({ groupPhoto: URL.createObjectURL(imageFile) });
  }, [imageFile]);

  const groupUpdateHandler = async () => {
    const data = await dispatch(
      updateGroup({
        data: {
          title: title,
          image: imageFile,
          id: +id,
        },
      }),
    );
    if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      location.push(`/group/${id}`);
    }
  };

  const image = useMemo(() => {
    if (!groupPhoto) return "url('/assets/images/defaultGroupInfo.png')";
    if (groupPhoto === groupData?.image) {
      return `url('${process.env.REACT_APP_API_HOST}${groupPhoto}')`;
    }
    return `url('${groupPhoto}')`;
  }, [groupPhoto, imageFile]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.showBoard}>
          <div className={styles.image} style={{ "--bg-image": image } as React.CSSProperties}></div>
          <div className={styles.updateInfo}>
            <p className={styles.name}>{title}</p>
            <div className={styles.tagBlock}>
              <p className={styles.group}>#product</p>
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
                  value={groupPhoto}
                  error={errors.groupPhotoError}
                  onChange={(ev) => {
                    const res = validate(ev);
                    if (res) {
                      setImageFile((ev as ChangeEvent<HTMLInputElement>).target.files![0]);
                    }
                  }}
                  placeholder={"UPLOAD"}
                />
              </div>
            </div>
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
              <Button onClick={groupUpdateHandler} variant="primary" disabled={!isSubmit} opClassName={styles.bd}>
                {t("updateCard.save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
