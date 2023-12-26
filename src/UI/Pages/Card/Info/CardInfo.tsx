import { useHistory, useParams } from "react-router-dom";
import React, { FC, useCallback, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useStore } from "Core/store";
import { Tag } from "Components/Tag/Tag";
import { Button } from "Components/Button/Button";
import { ThunkResponse } from "Core/types/Interactor";
import { IGroup } from "Core/Showcase/ShowcaseEntity";
import { ShareModal } from "Components/Modals/ShareModal/ShareModal";
import { DotsContainer } from "Components/DotsContainer/DotsContainer";
import { Arrow, Share, DotsAsset, BackMobileArrow } from "Components/Assets";
import { ShareMobile } from "Components/Assets/ShowcaseResponsive/ShareMobile";
import { CardOptionsModal } from "Components/Modals/CardOptionsModal/CardOptionsModal";
import { IOption } from "Components/Modals/CardOptionsModal/CardOptionsModal.interfaces";

import styles from "./styles.module.css";
import { Notification } from "libs/Notification";
import { ShareModalMobile } from "Components/Modals/ShareModalMobile/ShareModalMobile";
import { UnitOptionModal } from "Components/Modals/UnitOptionModal/UnitOptionModal";
import { ConfirmModal } from "Components/Modals/ConfirmModal/ConfirmModal";
import { IGroupState } from "Pages/Group/Info/GroupInfo.interfaces";
interface CardInfoParams {
  id: string;
}

export const CardInfo: FC = () => {
  const { id } = useParams<CardInfoParams>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    store: {
      Showcase: { cards, groups },
      Status: { statuses },
      Device: { isMobile },
    },
    asyncActions: {
      Showcase: { deleteCard, archiveCard },
    },
  } = useStore((store) => ({
    Showcase: store.ShowcaseEntity,
    CardTypes: store.CardTypesEntity,
    Status: store.StatusEntity,
    Device: store.DeviceEntity,
  }));
  const [isOptionOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isOpenShowcaseModal, setIsOpenShowcaseModal] = useState<boolean>(false);
  const [isOpenShowcaseMobileModal, setIsOpenShowcaseMobileModal] = useState<boolean>(false);
  const location = useHistory();
  const [modals, setModals] = useReducer(
    (oldState: IGroupState, newState: Partial<IGroupState>): IGroupState => ({
      ...oldState,
      ...newState,
    }),
    {
      sort: false,
      create: false,
      filter: false,
      share: false,
      additional: false,
      confirmD: false,
      confirmA: false,
      chooseDeletionType: false,
      chooseArchivationType: false,
    },
  );

  const cardData = useMemo(() => {
    if (!cards) return;
    let possibleRes = cards.find((el) => el.id === +id);
    if (!possibleRes) {
      groups.forEach((elG: IGroup) => {
        possibleRes = elG.cards.find((el) => el.id === +id);
      });
    }
    return possibleRes;
  }, [id]);

  const groupInfo = useMemo(() => {
    if (!cardData?.groupId) return;
    return groups.find((el) => el.id === cardData?.groupId);
  }, [id, cardData]);

  const imgLink = useMemo(() => {
    return cardData?.image
      ? `${process.env.REACT_APP_API_HOST}${cardData.image}`
      : "/assets/images/defaultCardInfo.png";
  }, [cardData]);

  const options: IOption[] = [
    {
      title: t("modalOptions.edit"),
      onClick: () => location.push(`/card/${id}/update`),
    },
    {
      title: t("modalOptions.delete"),
      onClick: () => setModals({ confirmD: true }),
      onMobile: false,
    },
    {
      title: cardData?.status.title !== "Archived" ? t("modalOptions.archive") : t("modalOptions.unarchive"),
      onClick: () => setModals({ confirmA: true }),
    },
    {
      title: t("modalOptions.delete"),
      onClick: async () => {
        const data = await dispatch(deleteCard({ id: +id }));
        if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
          location.push("/showcase");
        }
      },
      isRed: true,
      onMobile: true,
    },
  ];

  const archiveClickHandler = () => {
    if (cardData?.status.title !== "Archived") {
      dispatch(archiveCard({ id: +id, statusId: statuses.find((el) => el.title === "Archived")!.id }));
      Notification.success("The card was archived");
    } else {
      dispatch(archiveCard({ id: +id, statusId: statuses.find((el) => el.title === "Active")!.id }));
      Notification.success("The card was unarchived");
    }
    location.push("/showcase");
    setModals({ chooseArchivationType: true });
  };

  const deleteClickHandler = async () => {
    const data = await dispatch(deleteCard({ id: +id }));
    if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
      location.push("/showcase");
    }
    setModals({ chooseDeletionType: true });
  };

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.mobileHeader}>
          <div onClick={() => location.goBack()}>
            <BackMobileArrow />
          </div>
          <div className={styles.shareItems}>
            <ShareModal
              isOpen={isOpenShowcaseModal && !isMobile}
              setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}
              position="right"
              type={"card"}
              id={+id}
            />
            <div onClick={() => setIsOpenShowcaseMobileModal(!isOpenShowcaseMobileModal)}>
              <ShareMobile />
            </div>
            <CardOptionsModal
              options={options}
              position="right"
              isOpen={isOptionOpen && !isMobile}
              setIsOpen={() => setIsOptionsOpen(!isOptionOpen)}
            >
              <div onClick={() => setIsOptionsOpen(!isOptionOpen)}>
                <DotsAsset />
              </div>
            </CardOptionsModal>
          </div>
        </div>
      ) : (
        <div className={styles.backBtn} onClick={() => location.goBack()}>
          <Arrow />
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.imgWrapper}>
          <div className={styles.img} style={{ "--bg-image": `url("${imgLink}")` } as React.CSSProperties} />
        </div>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>{cardData?.title}</h1>
            <div className={styles.tagBlock}>
              <Tag>#{cardData?.cardType.title}</Tag>
              {groupInfo && <Tag>#{groupInfo.title}</Tag>}
            </div>
            <div className={styles.descrBlock}>
              <p className={styles.description}>{cardData?.description}</p>
            </div>
          </div>
          <div>
            <div className={styles.infoContainer}>
              <p className={styles.priceTitle}>{t("cardInfo.price")}:</p>
              <h3 className={styles.price}>${cardData?.price}</h3>
              {!cardData?.isUnlimited && cardData?.cardType.title !== "Donation" && (
                <p className={styles.stock}>
                  {t("cardInfo.inStock")}: {cardData?.stock}
                </p>
              )}
            </div>
            {!isMobile && (
              <div className={styles.btnWrapper}>
                <ShareModal
                  isOpen={isOpenShowcaseModal}
                  setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}
                  position="right"
                  type={"card"}
                  id={+id}
                />
                <div className={styles.btnContainer}>
                  <Button variant="gradient" onClick={() => setIsOpenShowcaseModal(!isOpenShowcaseModal)}>
                    <Share /> <span>{t("cardInfo.shareCard")}</span>
                  </Button>
                </div>
                <CardOptionsModal
                  options={options}
                  position="left"
                  isOpen={isOptionOpen}
                  setIsOpen={() => setIsOptionsOpen(!isOptionOpen)}
                >
                  <div className={styles.moreBtn} onClick={() => setIsOptionsOpen(!isOptionOpen)}>
                    <DotsContainer />
                  </div>
                </CardOptionsModal>
              </div>
            )}
          </div>
        </div>
      </div>
      {modals.confirmD && (
        <ConfirmModal
          text="Are you sure you want to delete the card?"
          onAccept={() => deleteClickHandler()}
          onReject={() => setModals({ confirmD: false })}
        />
      )}
      {modals.confirmA && (
        <ConfirmModal
          text="Are you sure you want to archive the card?"
          onAccept={() => archiveClickHandler()}
          onReject={() => setModals({ confirmA: false })}
        />
      )}
      <ShareModalMobile
        isVisible={isOpenShowcaseMobileModal}
        type={"card"}
        id={+id}
        close={() => setIsOpenShowcaseMobileModal(false)}
      />
      <UnitOptionModal isVisible={isOptionOpen && isMobile} options={options} close={() => setIsOptionsOpen(false)} />
    </div>
  );
};
