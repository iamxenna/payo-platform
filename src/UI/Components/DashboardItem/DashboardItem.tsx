import React, { FC, useMemo, useRef } from "react";
import classNames from "classnames";
import { BigArrow } from "Components/Assets";
import { IPurchase } from "Core/Transfer/TransferRepository";
import { useStore } from "Core/store";

import styles from "./styles.module.css";

interface DashboardItemProps extends Omit<IPurchase, "cardTypeId"> {
  cardType: {
    title: string;
    id: number;
  };
  isExpanded: boolean;
  itemClickHandler(): void;
}

export const DashboardItem: FC<DashboardItemProps> = ({
  cardName,
  cardType,
  quantity,
  network,
  comment,
  updatedAt,
  currency,
  to,
  from,
  amount,
  status,
  isExpanded,
  itemClickHandler,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    store: {
      Profile: { email },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
  }));

  const txDate = useMemo(() => {
    const timeSpend = new Date().getTime() - new Date(updatedAt).getTime();
    if (timeSpend <= 86400000) {
      return "Today";
    }
    if (timeSpend > 86400000 && timeSpend <= 172800000) {
      return "Yesterday";
    }
    if (timeSpend > 172800000 && timeSpend <= 604800000) {
      return "Last week";
    }
    if (timeSpend > 604800000 && timeSpend <= 2592000000) {
      return "Last month";
    }
    if (timeSpend > 2592000000 && timeSpend <= 31622400000) {
      return "Last year";
    }
    return "More than year ago";
  }, [updatedAt]);

  const statusLeft = useMemo(() => {
    if (email === to) {
      return "Received";
    }
    return "Paid";
  }, [email, to]);

  const customerData = useMemo(() => {
    if (!email) return;
    if (to === email) {
      return {
        title: "Customer",
        email: from,
      };
    }
    return {
      title: "Merchant",
      email: to,
    };
  }, [to, from, email]);

  const date = useMemo(() => {
    if (!updatedAt) return;
    const localDate = new Date(updatedAt);
    return `${localDate.getDate()} ${localDate.toLocaleString("en-US", {
      month: "long",
    })} ${localDate.getFullYear()} ${localDate.getHours()}:${localDate.getMinutes()}`;
  }, [updatedAt]);

  return (
    <div className={styles.wrapper} onClick={itemClickHandler} ref={wrapperRef}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <div className={styles.statusContainer}>
            <p className={styles.status}>{statusLeft}</p>
          </div>
          <div className={styles.nameDate}>
            <p className={styles.name}>{cardName}</p>
            <p className={styles.date}>{txDate}</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.amountStatus}>
            <p className={styles.amount}>{amount}$</p>
            <p className={classNames(styles.statusL, styles[status.title])}>
              {status.title}
              {status.title === "Processing" && "..."}
            </p>
          </div>
          <div className={classNames(styles.arrow, isExpanded && styles.expandedArrow)}>
            <BigArrow />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className={styles.expContainer}>
          <div className={styles.topContainer}>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>Date:</span> {date}
            </p>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>{customerData?.title}:</span> {customerData?.email}
            </p>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>Card type:</span> {cardType?.title}
            </p>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>Quantity:</span> {quantity}
            </p>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>Network:</span> {network}
            </p>
            <p className={styles.expDataText}>
              <span className={styles.expDataTitle}>Amount:</span> {amount} {currency}
            </p>
          </div>
          <div className={styles.bottomContainer}>
            <p className={styles.commentTitle}>Comment</p>
            <p className={styles.comment}>{comment}</p>
          </div>
        </div>
      )}
    </div>
  );
};
