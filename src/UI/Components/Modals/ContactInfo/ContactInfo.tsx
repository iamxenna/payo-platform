import React, { Dispatch, FC, SetStateAction } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.css";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";
import { ISocialLinks } from "Core/Profile/ProfileEntity";
import { slIcons } from "utils/icons";

interface ContactModal {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  socialNetworks: ISocialLinks[];
  isVisible: boolean;
}

export const ContactInfo: FC<ContactModal> = ({ isVisible, setIsOpenModal, socialNetworks }) => {
  return (
    <CSSTransition
      in={isVisible}
      classNames={{
        exitActive: "animate__animated animate__fadeOutRight",
        enterActive: "animate__animated animate__fadeInRight",
      }}
      unmountOnExit
      timeout={5000}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.head}>
            <div
              className={styles.arrow}
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              <ExportBackArrow />
            </div>
            <p className={styles.title}>Contact</p>
          </div>
          <div className={styles.links}>
            {socialNetworks?.map(({ title, type }, idx) => (
              <div className={styles.linkItem} key={idx}>
                <div className={styles.snIcon}>{slIcons[type as keyof typeof slIcons]("25", "25")}</div>
                <h1 className={styles.linkTitle}>{title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
