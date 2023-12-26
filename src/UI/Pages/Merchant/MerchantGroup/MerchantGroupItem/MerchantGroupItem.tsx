import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import React, { useMemo, FC } from "react";

import { ICard } from "Core/Showcase/ShowcaseEntity";
import styles from "./styles.module.css";

interface IMerchantGroupItem {
  data: ICard;
}

export const MerchantGroupItem: FC<IMerchantGroupItem> = ({ data }) => {
  const { t } = useTranslation();
  const navigation = useHistory();

  const imageLink = useMemo(() => {
    if (!data.image) return;
    if (data.image) return `${process.env.REACT_APP_API_HOST}${data.image}`;
    return "/assets/images/cardImg.png";
  }, [data.image]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} onClick={() => navigation.push(`/merchant/card/${data.id}`)}>
        {data?.status.title === "Archived" && <div className={styles.archived}>{t("archived")}</div>}
        <div className={styles.img} style={{ backgroundImage: `url(${imageLink})` }} />
        <div className={styles.container}>
          <div className={classNames(styles.title)}>
            <h3>{data.title}</h3>
            <p>#{data.cardType.title}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{data.description}</p>
          </div>
          <div className={styles.footer}>
            <h4>${data.price}</h4>
          </div>
        </div>
      </div>
      {/*<ShareModal*/}
      {/*  isOpen={isOpenShowcaseModal}*/}
      {/*  setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}*/}
      {/*  position="rightCard"*/}
      {/*  type={"card"}*/}
      {/*  id={data.id}*/}
      {/*>*/}
      {/*  <div className={styles.btn}>*/}
      {/*    <Button*/}
      {/*      variant="gradient"*/}
      {/*      onClick={() => setIsOpenShowcaseModal(!isOpenShowcaseModal)}*/}
      {/*      opClassName={styles.btnText}*/}
      {/*    >*/}
      {/*      <span className={styles.btnContent}>*/}
      {/*        <Share /> <span className={styles.text}>{t(`share.card`)}</span>*/}
      {/*      </span>*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</ShareModal>*/}
    </div>
  );
};
