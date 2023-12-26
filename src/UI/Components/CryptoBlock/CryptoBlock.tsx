import React, { FC } from "react";
import { INetworkTokens } from "Core/Profile/ProfileEntity";
import styles from "./styles.module.css";
import { tokens } from "utils/icons";

interface CryptoBlockProps {
  variant: "BNB" | "MATIC";
  title: string;
  enabledCryptos: INetworkTokens[];
}

export const CryptoBlock: FC<CryptoBlockProps> = ({ variant, title, enabledCryptos }) => (
  <div className={styles.wrapper}>
    <p className={styles.title}>{title}</p>
    <div className={styles.container}>
      <div className={styles.token}>
        <span className={styles.icon}>{tokens[variant]}</span>
        {variant}
      </div>
      {enabledCryptos.map((el, idx) => (
        <div className={styles.token} key={idx}>
          <span className={styles.icon}>{tokens[el]}</span>
          {el}
        </div>
      ))}
    </div>
  </div>
);
