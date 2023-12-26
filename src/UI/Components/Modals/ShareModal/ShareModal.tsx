import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "Components/Button/Button";
import { ArrowRight } from "Components/Assets/ServicesLogos";
import { AllowedServices, Services } from "Components/Modals/ShareModal/ShareModal.contants";
import { ModalProps } from "utils/i.modal";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { Notification } from "libs/Notification";
import { useClickOutside } from "hooks/useClickOutside";

interface ShareModalProps extends Omit<ModalProps, "children"> {
  type: "card" | "group" | "showcase";
  id: number;
}
export const ShareModal: FC<ShareModalProps> = ({ isOpen, setIsOpen, type, id }) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const modalRef = useRef<HTMLInputElement>(null);
  const [pageElements, setPageElements] = useState(Object.keys(Services));

  const {
    store: {
      Profile: { userName },
    },
  } = useStore((store) => ({
    Profile: store.ProfileEntity,
  }));

  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    setPageElements(Object.keys(Services).slice(pageIndex * 7, (pageIndex + 1) * 7));
  }, [pageIndex]);

  const linkData = useMemo(() => {
    return `${process.env.REACT_APP_FRONTEND_HOST}/${userName}/${type}/${id}`;
  }, [type, id]);

  const linkClickHandler = useCallback(
    (service: string) => {
      if (AllowedServices.includes(service)) {
        return window.open(`${Services[service as keyof typeof Services].to}${linkData}`);
      }
      return window.open(`${Services[service as keyof typeof Services].to}`);
    },
    [Services, linkData, AllowedServices],
  );

  return (
    <>
      {isOpen && (
        <div className={styles.wrapper}>
          <div className={styles.content} ref={modalRef}>
            <div className={styles.container}>
              <p className={styles.title}>Share {type}</p>
              <div className={pageIndex === 0 ? styles.servicesWrapper : styles.servicesWrapperReversed}>
                <div className={styles.servicesContainer}>
                  {pageElements.map((el, idx) => (
                    <div key={idx} className={styles.elementsWrapper} onClick={() => linkClickHandler(el)}>
                      {Services[el as keyof typeof Services].icon}
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
                <CopyToClipboard onCopy={() => Notification.success("Text copied successfully")} text={linkData}>
                  <Button variant={"gradient"} opClassName={styles.inputButton} onClick={() => undefined}>
                    <span className={styles.buttonText}>Copy link</span>
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
