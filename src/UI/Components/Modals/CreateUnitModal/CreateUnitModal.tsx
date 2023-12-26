import React, { FC, useMemo } from "react";
import { HelpModal } from "Components/HOCs/HelpModal/HelpModal";
import { ModalProps } from "utils/i.modal";
import styles from "./styles.module.css";
import { Button } from "Components/Button/Button";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

interface CreateUnitModalProps extends ModalProps {
  isPossible: boolean;
  groupId?: string;
  withoutGroup?: boolean;
}

export const CreateUnitModal: FC<CreateUnitModalProps> = ({
  children,
  isPossible,
  isOpen,
  setIsOpen,
  position,
  groupId = null,
  withoutGroup = false,
}) => {
  const navigation = useHistory();

  const createCardLink = useMemo(() => {
    if (!groupId) return "/cards/create";
    return `/cards/create?group=${groupId}`;
  }, [groupId]);

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div
          className={classNames(
            styles.content,
            position === "left" ? styles.left : position === "center" ? styles.center : styles.right,
          )}
        >
          <HelpModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={styles.container}>
              {isPossible ? (
                <>
                  <p className={styles.title}>What do you want to create?</p>
                  <div className={styles.btnWrapper}>
                    <Button
                      opClassName={styles.btnContainer}
                      variant="secondary"
                      onClick={() => navigation.push(createCardLink)}
                    >
                      Card
                    </Button>
                    {!withoutGroup && (
                      <Button
                        opClassName={styles.btnContainer}
                        variant="secondary"
                        onClick={() => navigation.push("groups/create")}
                      >
                        Group
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.title}>First you need to connect your wallet and mail</p>
                  <div className={styles.btnWrapper}>
                    <Button
                      opClassName={styles.btnContainer}
                      variant="secondary"
                      onClick={() => navigation.push("/profile")}
                    >
                      Go to profile
                    </Button>
                  </div>
                </>
              )}
            </div>
          </HelpModal>
        </div>
      )}
      {children}
    </div>
  );
};
