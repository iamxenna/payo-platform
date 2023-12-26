import React, { useCallback, useMemo, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import {
  Arrow,
  EmptyShowcaseArrow,
  Share,
  BackMobileArrow,
  DotsAsset,
  Sort,
  MiniArrow,
  Filter,
} from "Components/Assets";
import { Button } from "Components/Button/Button";
import { ShowcaseItem } from "Components/ShowcaseItem/ShowcaseItem";
import { DotsContainer } from "Components/DotsContainer/DotsContainer";
import { CardOptionsModal } from "Components/Modals/CardOptionsModal/CardOptionsModal";
import { IOption } from "Components/Modals/CardOptionsModal/CardOptionsModal.interfaces";
import { CreateUnitModal } from "Components/Modals/CreateUnitModal/CreateUnitModal";
import { IGroupState } from "./GroupInfo.interfaces";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { ICard } from "Core/Showcase/ShowcaseEntity";
import { sort } from "Pages/Showcase/Showcase.constants";
import { ShareModal } from "Components/Modals/ShareModal/ShareModal";
import { useDispatch } from "react-redux";
import { ConfirmModal } from "Components/Modals/ConfirmModal/ConfirmModal";
import { ChooseActionTypeModal } from "Components/Modals/ChooseActionTypeModal/ChooseActionTypeModal";
import { IArchiveGroupType, IDeleteGroupType } from "Core/Showcase/ShowcaseRepository";
import { ThunkResponse } from "Core/types/Interactor";
import { ShareMobile } from "Components/Assets/ShowcaseResponsive/ShareMobile";
import { SortModal } from "Components/Modals/SortModal/SortModal";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { Notification } from "libs/Notification";
import { Pagination } from "Components/Paginations/Pagination";
import { useWindowSize } from "hooks/useWindowSize";
import { FilterModal } from "Components/Modals/FilterModal/FilterModal";
import { filter } from "./GroupInfo.constants";
import { FilterRespModal } from "Components/Modals/FilterRespModal/FilterRespModal";
import { SortRespModal } from "Components/Modals/SortRespModal/SortRespModal";
import { CreateUnitModalResp } from "Components/Modals/CreateUnitModal/Resp/CreateUnitModal";
import { UnitOptionModal } from "Components/Modals/UnitOptionModal/UnitOptionModal";

export const GroupInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useHistory();
  const {
    store: {
      Showcase: { groups },
      Statuses: { statuses },
      Device: { isMobile },
    },
    asyncActions: {
      Showcase: { deleteGroup, archiveGroup },
    },
  } = useStore((store) => ({
    Showcase: store.ShowcaseEntity,
    Statuses: store.StatusEntity,
    Device: store.DeviceEntity,
  }));
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenShowcaseModal, setIsOpenShowcaseModal] = useState<boolean>(false);
  const [isOptionOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(1);
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
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const sortValues = ["Newest", "Oldest", "Name: A - Z", "Name: Z - A"];
  const windowSize = useWindowSize();

  const [selectedFilter, setSelectedFilter] = useState<number[]>([0, 1]);
  const filterValues = ["Product card", "Donation card"];

  const groupData = useMemo(() => {
    return groups.find((el) => el.id === +id);
  }, [id]);

  const archiveClickHandler = useCallback(() => {
    if (groupData?.cards.length === 0 || groupData?.status.title === "Archived") {
      actionArchiveClickHandler("withCards");
      return;
    }
    setModals({ chooseArchivationType: true });
  }, [groupData]);

  const deleteClickHandler = useCallback(() => {
    if (groupData?.cards.length === 0) {
      actionDeleteClickHandler("withCards");
      return;
    }
    setModals({ chooseDeletionType: true });
  }, [groupData]);

  const options: IOption[] = [
    {
      title: "Edit",
      onClick: () => location.push(`/group/${id}/update`),
    },
    {
      title: "Delete",
      onClick: () => setModals({ confirmD: true }),
    },
    {
      title: groupData?.status.title !== "Archived" ? t("modalOptions.archive") : t("modalOptions.unarchive"),
      onClick: () => setModals({ confirmA: true }),
    },
  ];

  const preparedItems: ICard[] = useMemo(() => {
    if (!groupData?.cards || !groupData) return [];
    let rawItems = [...groupData.cards];
    filterValues.forEach((_, idx) => {
      if (!selectedFilter.includes(idx)) {
        rawItems = filter[filterValues[idx]](rawItems);
      }
    });
    const archived = rawItems.filter((el) =>
      !showArchived ? el.status.title !== "Archived" : el.status.title === "Archived",
    );
    return sort[sortValues[selectedSort]](archived);
  }, [groupData, selectedSort, showArchived, selectedFilter, index]);

  const pageItemsCount = useMemo(() => {
    if (window.innerWidth > 1600) {
      return 8;
    } else if (window.innerWidth > 890 && window.innerWidth <= 1600) {
      return 6;
    } else if (window.innerWidth > 520 && window.innerWidth <= 890) {
      return 4;
    } else {
      return 4;
    }
  }, [windowSize, groupData?.cards]);

  const pageItems = useMemo(() => {
    return preparedItems.slice((index - 1) * pageItemsCount, pageItemsCount * index);
  }, [preparedItems, pageItemsCount]);

  const actionDeleteClickHandler = useCallback(
    async (behavior: IDeleteGroupType) => {
      const data = await dispatch(deleteGroup({ id: +id, type: behavior }));
      if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
        location.push("/showcase");
      }
    },
    [dispatch, deleteGroup, id, location],
  );

  const actionArchiveClickHandler = useCallback(
    async (behavior: IArchiveGroupType) => {
      const statusId =
        groupData?.status.title === "Archived"
          ? statuses.find((el) => el.title === "Active")!.id
          : statuses.find((el) => el.title === "Archived")!.id;

      const data = await dispatch(archiveGroup({ id: +id, type: behavior, statusId }));
      if ((data as unknown as ThunkResponse).meta.requestStatus === "fulfilled") {
        location.push("/showcase");
        if (groupData?.status.title === "Archived") {
          Notification.success("The group was unarchived");
          return;
        }
        Notification.success("The group was archived");
      }
    },
    [dispatch, archiveGroup, groupData, statuses, id, location],
  );

  const items = useMemo(() => {
    return (
      <div className={styles.sortContainer}>
        <SortModal
          sortValues={sortValues}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          isOpen={modals.sort && !isMobile}
          setIsOpen={() => setModals({ sort: !modals.sort })}
        >
          <div className={styles.sort} onClick={() => setModals({ sort: !modals.sort })}>
            {!isMobile && <Sort />}
            <p className={styles.textSort}>Sort by Newest</p>
            {!isMobile && (
              <div className={styles.arrow}>
                <MiniArrow color="#100C1A" />
              </div>
            )}
          </div>
        </SortModal>
        <SortRespModal
          setIsOpenModal={(value: boolean) => setModals({ sort: value })}
          isVisible={modals.sort && isMobile}
          selectedSort={selectedSort}
          sortValues={sortValues}
          setSelectedSort={setSelectedSort}
        />
        <FilterModal
          filterValues={filterValues}
          selectedFilter={selectedFilter}
          setSelectedFilter={(idx: number) => {
            const newFilter = [...selectedFilter];
            if (newFilter.includes(idx)) {
              setSelectedFilter(newFilter.filter((el) => idx !== el));
            } else {
              newFilter.push(idx);
              setSelectedFilter(newFilter.sort());
            }
          }}
          isOpen={modals.filter && !isMobile}
          setIsOpen={() => setModals({ filter: !modals.filter })}
        >
          <div className={styles.filter} onClick={() => setModals({ filter: !modals.filter })}>
            {!isMobile && <Filter />}
            <p className={styles.textSort}>Filter</p>
            {!isMobile && (
              <div className={styles.arrow}>
                <MiniArrow color="#100C1A" />
              </div>
            )}
          </div>
        </FilterModal>
        <FilterRespModal
          setIsOpenModal={(value: boolean) => setModals({ filter: value })}
          selectedFilter={selectedFilter}
          filterValues={filterValues}
          isArchived={showArchived}
          setIsArchived={setShowArchived}
          setSelectedFilter={(idx: number) => {
            const newFilter = [...selectedFilter];
            if (newFilter.includes(idx)) {
              setSelectedFilter(newFilter.filter((el) => idx !== el));
            } else {
              newFilter.push(idx);
              setSelectedFilter(newFilter.sort());
            }
          }}
          isVisible={modals.filter && isMobile}
        />
        {!isMobile && (
          <div className={styles.archived} onClick={() => setShowArchived(!showArchived)}>
            <Checkbox isOn={showArchived} onClick={() => setShowArchived(!showArchived)} />
            <p className={styles.archivedTitle}>Show archived</p>
          </div>
        )}
      </div>
    );
  }, [sortValues, selectedSort, setSelectedSort, setModals, modals, setShowArchived, showArchived]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.backBtn}>
        {isMobile ? (
          <div className={styles.mobileArrow} onClick={() => location.goBack()}>
            <BackMobileArrow />
          </div>
        ) : (
          <div onClick={() => location.goBack()}>
            <Arrow />
          </div>
        )}
        <p className={styles.groupTitle}>{groupData?.title}</p>
      </div>
      <div className={styles.head}>
        {!isMobile && items}
        <div className={styles.btnBlock}>
          <CreateUnitModal
            isOpen={isOpenCreateModal && !isMobile}
            setIsOpen={(value = !isOpenCreateModal) => setIsOpenCreateModal(value)}
            isPossible={true}
            position="right"
            groupId={id}
            withoutGroup
          >
            <div className={styles.createBtnContainer}>
              <Button
                variant="primary"
                opClassName={classNames(styles.btn, styles.bs)}
                onClick={() => setIsOpenCreateModal(!isOpenCreateModal)}
              >
                <span className={styles.plus}>+</span> Create
              </Button>
            </div>
          </CreateUnitModal>
          <div className={styles.buttonContainer}>
            <ShareModal
              isOpen={isOpenShowcaseModal}
              setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}
              position="right"
              type={"group"}
              id={+id}
            />
            {isMobile ? (
              <div onClick={() => setIsOpenShowcaseModal(!isOpenShowcaseModal)}>
                <ShareMobile />
              </div>
            ) : (
              <div className={styles.shareBtnContainer}>
                <Button
                  variant="gradient"
                  opClassName={classNames(styles.bs, styles.px)}
                  onClick={() => setIsOpenShowcaseModal(!isOpenShowcaseModal)}
                >
                  <span className={styles.btnContent}>
                    <Share /> <span className={styles.text}>Share group</span>
                  </span>
                </Button>
              </div>
            )}
            <CardOptionsModal
              options={options}
              position="center"
              isOpen={isOptionOpen && !isMobile}
              setIsOpen={() => setIsOptionsOpen(!isOptionOpen)}
            >
              <div className={styles.moreBtn} onClick={() => setIsOptionsOpen(!isOptionOpen)}>
                {isMobile ? <DotsAsset /> : <DotsContainer />}
              </div>
            </CardOptionsModal>
          </div>
        </div>
      </div>
      {isMobile && <div>{items}</div>}
      {!preparedItems && (
        <div className={styles.emptyShowcase}>
          <p className={styles.emptyTitle}>
            Here is your group. <br /> To get started click the <br /> Create button
          </p>
          <div className={styles.eArrow}>
            <EmptyShowcaseArrow />
          </div>
        </div>
      )}
      <div className={styles.cardContainer}>
        {pageItems.map(({ id: cardId }, idx) => (
          <ShowcaseItem
            key={idx}
            type={"card"}
            id={cardId}
            fromGroup={true}
            idx={idx}
            groupId={+id}
            length={pageItems.length}
          />
        ))}
      </div>
      {preparedItems.length > pageItemsCount && (
        <div>
          <Pagination
            active={index}
            setActive={(idx: number) => setIndex(idx)}
            pageCount={Math.ceil(preparedItems.length / pageItemsCount)}
          />
        </div>
      )}
      {modals.confirmD && (
        <ConfirmModal
          text="Are you sure you want to delete the group?"
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
      {modals.chooseDeletionType && (
        <ChooseActionTypeModal
          close={() => setModals({ chooseDeletionType: false })}
          text={
            <span>
              What would you like to do with the cards of <br /> this group:
            </span>
          }
          params={[
            {
              title: "Delete cards along with the group",
              action: () => actionDeleteClickHandler("withCards"),
            },
            {
              title: "Remove cards from the group",
              action: () => actionDeleteClickHandler("removeCardFromGroup"),
            },
            {
              title: "Remove cards from the group and archive them",
              action: () => actionDeleteClickHandler("archiveCard"),
            },
          ]}
        />
      )}
      {modals.chooseArchivationType && (
        <ChooseActionTypeModal
          close={() => setModals({ chooseArchivationType: false })}
          text="What would you like to do with the cards of this group:"
          params={[
            {
              title: "Archive cards along with the group",
              action: () => actionArchiveClickHandler("withCards"),
            },
            {
              title: "Remove cards from the group",
              action: () => actionArchiveClickHandler("removeCardFromGroup"),
            },
          ]}
        />
      )}
      <CreateUnitModalResp
        groupId={+id}
        isVisible={isOpenCreateModal && isMobile}
        close={() => setIsOpenCreateModal(false)}
      />
      <UnitOptionModal isVisible={isOptionOpen && isMobile} options={options} close={() => setIsOptionsOpen(false)} />
    </div>
  );
};
