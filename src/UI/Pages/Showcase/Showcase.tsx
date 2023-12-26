import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { Filter, Sort, Share, MiniArrow, EmptyShowcaseArrow } from "Components/Assets";
import { Button } from "Components/Button/Button";
import { ShowcaseItem } from "Components/ShowcaseItem/ShowcaseItem";
import styles from "./styles.module.css";
import { CreateUnitModal } from "Components/Modals/CreateUnitModal/CreateUnitModal";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { IModalState } from "./Showcase.interfaces";
import { SortModal } from "Components/Modals/SortModal/SortModal";
import { FilterModal } from "Components/Modals/FilterModal/FilterModal";
import { useStore } from "Core/store";
import { IItem } from "Core/Showcase/ShowcaseEntity";
import { filter, sort } from "./Showcase.constants";
import { ShareModal } from "Components/Modals/ShareModal/ShareModal";
import { ShareMobile } from "Components/Assets/ShowcaseResponsive/ShareMobile";
import { ShareModalMobile } from "Components/Modals/ShareModalMobile/ShareModalMobile";
import { Pagination } from "Components/Paginations/Pagination";
import { useWindowSize } from "hooks/useWindowSize";
import { CreateUnitModalResp } from "Components/Modals/CreateUnitModal/Resp/CreateUnitModal";
import { SortRespModal } from "Components/Modals/SortRespModal/SortRespModal";
import { FilterRespModal } from "Components/Modals/FilterRespModal/FilterRespModal";

export const Showcase = () => {
  const dispatch = useDispatch();
  const {
    store: {
      Showcase: { items, id },
      Profile: { email },
      User: {
        wallet: { wallet },
      },
      Status: { statuses },
      Device: { isTablet, isMobile, isMobileLayoutForTablet },
    },
    asyncActions: {
      Showcase: { getShowcase },
      Status: { getStatuses },
    },
  } = useStore((store) => ({
    User: store.UserEntity,
    Profile: store.ProfileEntity,
    Showcase: store.ShowcaseEntity,
    Status: store.StatusEntity,
    Device: store.DeviceEntity,
  }));

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenShowcaseModal, setIsOpenShowcaseModal] = useState<boolean>(false);
  const [isOpenShowcaseMobileModal, setIsOpenShowcaseMobileModal] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const [modals, setModals] = useReducer(
    (oldState: IModalState, newState: Partial<IModalState>): IModalState => ({
      ...oldState,
      ...newState,
    }),
    {
      sort: false,
      filter: false,
      create: false,
      share: false,
    },
  );
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(1);
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const sortValues = ["Newest", "Oldest", "Name: A - Z", "Name: Z - A"];

  const [selectedFilter, setSelectedFilter] = useState<number[]>([0, 1, 2]);
  const filterValues = ["Group", "Product card", "Donation card"];

  useEffect(() => {
    if (statuses.length > 0) return;
    dispatch(getStatuses());
  }, []);

  useEffect(() => {
    dispatch(getShowcase());
  }, []);

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
  }, [items, windowSize]);

  const preparedItems: IItem[] = useMemo(() => {
    if (!items) return [];
    const filteredValues: IItem[] = [];
    selectedFilter.forEach((el) => {
      const values = filter[filterValues[el]]([...items]);
      filteredValues.push(...values);
    });
    const isCardsArchived = filteredValues.filter((el) =>
      !showArchived ? el.status.title !== "Archived" : el.status.title === "Archived",
    );
    return sort[sortValues[selectedSort]](isCardsArchived);
  }, [selectedFilter, selectedSort, items, index, showArchived]);

  const pageItems = useMemo(() => {
    return preparedItems.slice((index - 1) * pageItemsCount, pageItemsCount * index);
  }, [preparedItems, pageItemsCount]);

  const filtersItems = useMemo(() => {
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
            <p className={styles.textSort}>Sort by {sortValues[selectedSort]}</p>
            {!isMobile && (
              <div className={styles.arrow}>
                <MiniArrow color="#100C1A" />
              </div>
            )}
          </div>
        </SortModal>
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
        <SortRespModal
          setIsOpenModal={(value: boolean) => setModals({ sort: value })}
          isVisible={modals.sort && isMobile}
          selectedSort={selectedSort}
          sortValues={sortValues}
          setSelectedSort={setSelectedSort}
        />
        {!isTablet && (
          <div className={styles.archived} onClick={() => setShowArchived(!showArchived)}>
            <Checkbox isOn={showArchived} onClick={() => setShowArchived(!showArchived)} />
            <p className={styles.archivedTitle}>Show archived</p>
          </div>
        )}
      </div>
    );
  }, [showArchived, setShowArchived, filterValues, selectedFilter, setSelectedFilter, modals, setModals, isMobile]);

  return (
    <div className={styles.wrapper}>
      {(isTablet || isMobileLayoutForTablet) && <h1 className={styles.title}>Showcase</h1>}
      <div className={styles.head}>
        {isMobile ? <h1 className={styles.title}>Showcase</h1> : filtersItems}
        <div className={styles.btnBlock}>
          <CreateUnitModal
            isOpen={isOpenCreateModal && !isMobile}
            isPossible={!!wallet && !!email}
            setIsOpen={(value = !isOpenCreateModal) => setIsOpenCreateModal(value)}
            position="right"
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
          <ShareModal
            isOpen={isOpenShowcaseModal}
            setIsOpen={(value = !isOpenShowcaseModal) => setIsOpenShowcaseModal(value)}
            type="showcase"
            position="right"
            id={id}
          />
          {isMobile ? (
            <div className={styles.pointer} onClick={() => setIsOpenShowcaseMobileModal(!isOpenShowcaseMobileModal)}>
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
                  <Share /> <span className={styles.text}>Share showcase</span>
                </span>
              </Button>
            </div>
          )}
        </div>
      </div>
      {isMobile && <div className={styles.filterItems}>{filtersItems}</div>}
      {!isMobile && !isMobileLayoutForTablet && preparedItems.length === 0 && !showArchived && (
        <div className={styles.emptyShowcase}>
          <p className={styles.emptyTitle}>
            Here is your showcase. <br /> To get started click the <br /> Create button
          </p>
          <div className={styles.eArrow}>
            <EmptyShowcaseArrow />
          </div>
        </div>
      )}
      <div className={styles.cardContainer}>
        {pageItems?.map(({ type, id }, idx) => (
          <ShowcaseItem key={idx} type={type} id={id} idx={idx} length={preparedItems.length} />
        ))}
      </div>
      {preparedItems.length > pageItemsCount && (
        <div>
          <Pagination
            active={index}
            setActive={(idx: number) => setIndex(idx)}
            pageCount={Math.ceil(items.length / pageItemsCount)}
          />
        </div>
      )}
      <ShareModalMobile
        id={id}
        type={"showcase"}
        isVisible={isOpenShowcaseMobileModal}
        close={() => setIsOpenShowcaseMobileModal(false)}
      />
      <CreateUnitModalResp isVisible={isOpenCreateModal && isMobile} close={() => setIsOpenCreateModal(false)} />
    </div>
  );
};
