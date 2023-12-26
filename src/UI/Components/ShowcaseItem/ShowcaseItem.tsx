import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import React, { useMemo, FC, useState, useEffect } from "react";
import { Button } from "Components/Button/Button";
import { Share } from "Components/Assets";

import { useStore } from "Core/store";
import { ICard, IGroup } from "Core/Showcase/ShowcaseEntity";
import styles from "./styles.module.css";
import { ShareModal } from "Components/Modals/ShareModal/ShareModal";
import { useWindowSize } from "hooks/useWindowSize";

interface IShowcaseItem {
  type: "card" | "group";
  id: number;
  img?: string;
  price?: number;
  fromGroup?: boolean;
  groupId?: number;
  idx: number;
  length: number;
}

export const ShowcaseItem: FC<IShowcaseItem> = ({ type, id, fromGroup = false, groupId, idx, length }) => {
  const { t } = useTranslation();
  const [isOpenShowcaseModal, setIsOpenShowcaseModal] = useState<boolean>(false);
  const [position, setPosition] = useState<"center" | "left" | "right" | "rightCard">("left");
  const navigation = useHistory();
  const windowSize = useWindowSize();
  const {
    store: {
      Showcase: { cards, groups },
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Showcase: store.ShowcaseEntity,
    Device: store.DeviceEntity,
  }));

  const itemData = useMemo(() => {
    if (fromGroup) {
      const group = groups.find((el) => el.id === groupId);
      return group?.cards.find((el) => el.id === id);
    }
    if (type === "group") {
      return groups.find((el) => el.id === id);
    }
    return cards.find((el) => el.id === id);
  }, [id, fromGroup, groupId, type]);

  const imageLink = useMemo(() => {
    if (!itemData) return;
    if (itemData?.image) return `${process.env.REACT_APP_API_HOST}${itemData.image}`;
    return type !== "group" ? "/assets/images/cardImg.png" : "/assets/images/groupImg.png";
  }, [itemData]);

  const descriptionCompact = useMemo(() => {
    if (type === "group") return;
    if ((itemData as ICard).description.length > 30 && window.innerWidth > 1740) {
      return `${(itemData as ICard).description.slice(0, 30)}... more`;
    } else if ((itemData as ICard).description.length > 18 && window.innerWidth > 1024) {
      return `${(itemData as ICard).description.slice(0, 18)}... more`;
    } else if ((itemData as ICard).description.length > 10 && window.innerWidth < 1024) {
      return `${(itemData as ICard).description.slice(0, 10)}... more`;
    }
    return (itemData as ICard).description;
  }, [type, itemData, windowSize]);

  const itemsCount = useMemo(() => {
    if (type === "card") return 0;
    return [...(itemData as IGroup).cards].filter((el) => el.status.title !== "Archived").length;
  }, [type, itemData]);

  const itemsAmount = () => {
    const items = Math.floor((window.innerWidth - 425) / 346);
    const rows = Math.ceil(length / items);
    if (items >= items * rows - idx && rows !== 1) {
      setPosition("rightCard");
    } else if (idx % items === 0) {
      setPosition("left");
    } else if ((idx + 1) % items === 0) {
      setPosition("right");
    } else {
      setPosition("center");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", itemsAmount);

    return () => {
      window.removeEventListener("resize", itemsAmount);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} onClick={() => navigation.push(`/${type}/${id}`)}>
        {itemData?.status.title === "Archived" && <div className={styles.archived}>{t("archived")}</div>}
        <div className={styles.img} style={{ backgroundImage: `url(${imageLink})` }} />
        <div className={styles.container}>
          <div className={classNames(styles.title)}>
            <h3>{type === "card" ? (itemData as ICard).title : (itemData as IGroup).title}</h3>
            <p>#{type === "card" ? (itemData as ICard).cardType.title : "group"}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{descriptionCompact}</p>
          </div>
          <div className={styles.footer}>
            {type === "card" ? <h4>${(itemData as ICard).price}</h4> : <h4>{itemsCount} Cards</h4>}
          </div>
        </div>
      </div>
      {!isMobile && (
        <>
          <ShareModal
            isOpen={isOpenShowcaseModal}
            setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}
            position={position}
            type={type}
            id={id}
          />
          <div className={styles.btn}>
            <Button
              variant="gradient"
              onClick={() => setIsOpenShowcaseModal(!isOpenShowcaseModal)}
              opClassName={styles.btnText}
            >
              <span className={styles.btnContent}>
                <Share /> <span className={styles.text}>{t(`share.${type}`)}</span>
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
