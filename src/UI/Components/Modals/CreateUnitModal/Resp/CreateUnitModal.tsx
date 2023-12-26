import { BottomModalWrapper } from "Components/Modals/BottomModalWrapper/BottomModalWrapper";
import React, { FC, useMemo } from "react";
import { useHistory } from "react-router-dom";

import styles from "./stles.module.css";

interface CreateUnitModalRespProps {
  isVisible: boolean;
  groupId?: number;
  close(): void;
}

export const CreateUnitModalResp: FC<CreateUnitModalRespProps> = ({ isVisible, close, groupId }) => {
  const navigation = useHistory();
  const link = useMemo(() => {
    if (groupId) {
      return `/cards/create?group=${groupId}`;
    }
    return `/cards/create`;
  }, [groupId]);
  return (
    <BottomModalWrapper isVisible={isVisible} close={close}>
      <div className={styles.createWrapper}>
        <div className={styles.itemContainer} onClick={() => navigation.push(link)}>
          <p className={styles.item}>Card</p>
        </div>
        {!groupId && (
          <div className={styles.itemContainer} onClick={() => navigation.push("/groups/create")}>
            <p className={styles.item}>Group</p>
          </div>
        )}
      </div>
    </BottomModalWrapper>
  );
};
