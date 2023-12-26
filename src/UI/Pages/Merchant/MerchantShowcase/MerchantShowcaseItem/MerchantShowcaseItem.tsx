import classNames from "classnames";
import { useHistory } from "react-router-dom";
import React, { useMemo, FC } from "react";

import { ICard, IGroup, IItem } from "Core/Showcase/ShowcaseEntity";
import styles from "./styles.module.css";
import { useWindowSize } from "hooks/useWindowSize";

interface IMerchantShowcaseItem {
  type: "card" | "group";
  data: IItem;
  userName: string;
}

export const MerchantShowcaseItem: FC<IMerchantShowcaseItem> = ({ type, data, userName }) => {
  const navigation = useHistory();

  const itemsCount = useMemo(() => {
    if (data.type === "card") return 0;
    return [...(data as IGroup).cards].filter((el) => el.status.title !== "Archived").length;
  }, [data]);

  const windowSize = useWindowSize();
  const imageLink = useMemo(() => {
    if (!data.image) {
      return type !== "group" ? "/assets/images/cardImg.png" : "/assets/images/groupImg.png";
    }
    return `${process.env.REACT_APP_API_HOST}${data.image}`;
  }, [data]);

  const description = useMemo(() => {
    if (type === "group") return;
    if ((data as ICard).description.length > 30 && window.innerWidth > 1740) {
      return `${(data as ICard).description.slice(0, 30)}... more`;
    } else if ((data as ICard).description.length > 18 && window.innerWidth > 1024) {
      return `${(data as ICard).description.slice(0, 18)}... more`;
    } else if ((data as ICard).description.length > 10 && window.innerWidth < 1024) {
      return `${(data as ICard).description.slice(0, 10)}... more`;
    }
    return (data as ICard).description.slice(0, 30);
  }, [data, type, windowSize]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} onClick={() => navigation.push(`/${userName}/${type}/${data.id}`)}>
        <div className={styles.img} style={{ backgroundImage: `url(${imageLink})` }} />
        <div className={styles.container}>
          <div className={classNames(styles.title, type === "group" && styles.mb)}>
            <h3>{type === "card" ? (data as ICard).title : (data as IGroup).title}</h3>
            <p>#{type === "card" ? (data as ICard).cardType.title : "group"}</p>
          </div>
          {type === "card" && (
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>{description}</p>
            </div>
          )}
          <div className={styles.footer}>
            {type === "card" ? <h4>${(data as ICard).price}</h4> : <h4>{itemsCount} Cards</h4>}
          </div>
        </div>
      </div>
    </div>
  );
};
