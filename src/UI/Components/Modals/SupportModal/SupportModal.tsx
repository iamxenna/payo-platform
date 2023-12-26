import React, { FC, useCallback, useReducer, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ModalProps } from "utils/i.modal";
import { Input } from "Components/Input/Input";
import Select, { Option } from "Components/Select/Select";
import { Button } from "Components/Button/Button";
import { useClickOutside } from "hooks/useClickOutside";
import { CloseBig } from "Components/Assets";

import styles from "./styles.module.css";
import { HttpClient } from "libs/HttpClient";
import { Notification } from "libs/Notification";
interface SupportState {
  name: string;
  email: string;
  question: string;
  description: string;
}

const SupportModal: FC<Omit<ModalProps, "children">> = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [questionData, setQuestionData] = useReducer(
    (oldState: SupportState, newState: Partial<SupportState>) => ({
      ...oldState,
      ...newState,
    }),
    {
      name: "",
      email: "",
      question: "Payment",
      description: "",
    },
  );

  const sendClickHandler = useCallback(async () => {
    try {
      await HttpClient.post("/contact", {
        name: questionData.name,
        email: questionData.email,
        subject: questionData.question,
        comment: questionData.description,
      });
      Notification.success("Your message was successfully sent");
    } catch (err) {
      Notification.error("There was a failure while sending, try again");
    }
  }, [questionData]);

  const questionType = ["Authorization", "Showcase", "Payment", "Profile", "Account", "Other"];
  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.content} ref={modalRef}>
          <div>
            <div className={styles.closeModal} onClick={() => setIsOpen(false)}>
              <CloseBig />
            </div>
            <div className={styles.container}>
              <h1 className={styles.supportHead}>Support</h1>
              <div className={styles.inputs}>
                <Input
                  variant={"default"}
                  title={t("support.name")}
                  type={"text"}
                  value={questionData.name}
                  onChange={({ target }) => setQuestionData({ name: target.value })}
                  placeholder={t("support.typeName")}
                />
                <Input
                  variant={"default"}
                  title={t("support.email")}
                  isImportant
                  type={"text"}
                  value={questionData.email}
                  onChange={({ target }) => setQuestionData({ email: target.value })}
                  placeholder={t("support.typeEmail")}
                />
                <Select
                  onChange={(value) => setQuestionData({ question: value as string })}
                  value={questionData.question}
                  title={t("support.question")}
                >
                  {questionType.map((el, idx) => (
                    <Option key={idx} value={el}>
                      {el}
                    </Option>
                  ))}
                </Select>
                <Input
                  variant={"bigText"}
                  title={t("support.describe")}
                  type={"bigText"}
                  isImportant
                  value={questionData.description}
                  onChange={({ target }) => setQuestionData({ description: target.value })}
                  placeholder={t("support.max")}
                />
              </div>
              <Button
                onClick={sendClickHandler}
                disabled={!questionData.email || !questionData.description}
                opClassName={styles.btn}
                variant={"gradient"}
              >
                {t("support.send")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportModal;
