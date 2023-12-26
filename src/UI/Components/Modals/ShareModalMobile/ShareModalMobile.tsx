import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./styles.module.css";
import { useClickOutside } from "hooks/useClickOutside";
import { Services } from "Components/Modals/ShareModal/ShareModal.contants";
import { ArrowRight } from "Components/Assets/ServicesLogos";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "Components/Button/Button";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";
import { useStore } from "Core/store";

interface ShareProps {
  isVisible: boolean;
  close(): void;
  type: "card" | "group" | "showcase";
  id: number;
}
export const ShareModalMobile: FC<ShareProps> = ({ isVisible, close, type, id }) => {
  const {
    store: {
      Profile: { userName },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
  }));
  const ref = useRef<HTMLDivElement>(null);

  const scroll = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>;
  // const events = useDraggable(scroll);

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageElements, setPageElements] = useState(Object.keys(Services));

  useEffect(() => {
    setPageElements(Object.keys(Services).slice(pageIndex * 5, (pageIndex + 1) * 5));
  }, [pageIndex]);

  const linkData = useMemo(() => {
    return `${process.env.REACT_APP_FRONTEND_HOST}/${userName}/${type}/${id}`;
  }, [type, id]);

  const outsideClickHandler = () => close();

  useClickOutside(ref, outsideClickHandler);
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
      <div className={styles.wrapper} ref={ref}>
        <div className={styles.container}>
          <div className={styles.arrow} onClick={() => close()}>
            <ExportBackArrow />
          </div>
          <div className={styles.head}>
            <p className={styles.title}>Share</p>
          </div>
          <div className={pageIndex === 0 ? styles.servicesWrapper : styles.servicesWrapperReversed}>
            <div className={styles.servicesContainer} ref={scroll}>
              {pageElements.map((el, idx) => (
                <div key={idx} className={styles.elementsWrapper}>
                  <div className={styles.icon}>{Services[el as keyof typeof Services].icon}</div>
                  <p className={styles.servicesTitle}>{el}</p>
                </div>
              ))}
            </div>
            <div
              className={pageIndex === 0 ? styles.arrowWrapper : styles.arrowWrapperReversed}
              onClick={pageIndex === 0 ? () => setPageIndex(1) : () => setPageIndex(0)}
            >
              <ArrowRight />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.inputText}>{linkData}</p>
            <CopyToClipboard text={linkData}>
              <Button variant={"gradient"} opClassName={styles.inputButton} onClick={() => undefined}>
                <span className={styles.buttonText}>Copy</span>
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
