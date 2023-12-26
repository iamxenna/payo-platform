import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Filter, MiniArrow, Sort } from "Components/Assets";
import { SortModal } from "Components/Modals/SortModal/SortModal";
import styles from "./styles.module.css";
import { useStore } from "Core/store";
import { IMerchantGroupState } from "./MerchantGroup.interfaces";
import { FilterModal } from "Components/Modals/FilterModal/FilterModal";
import { MerchantGroupItem } from "./MerchantGroupItem/MerchantGroupItem";
import { MerchantUserInfo } from "Components/MerchantUserInfo/MerchantUserInfo";
import { ICard } from "Core/Showcase/ShowcaseEntity";
import { sort } from "Pages/Showcase/Showcase.constants";
import { filter } from "Pages/Group/Info/GroupInfo.constants";
import { FilterRespModal } from "Components/Modals/FilterRespModal/FilterRespModal";
import { SortRespModal } from "Components/Modals/SortRespModal/SortRespModal";
import { useWindowSize } from "hooks/useWindowSize";
import { Pagination } from "Components/Paginations/Pagination";

export const MerchantGroup = () => {
  const { id } = useParams<{ id: string; userName: string }>();
  const dispatch = useDispatch();
  const {
    store: {
      Merchant: { group, profile },
      Device: { isMobile },
    },
    actions: {
      Merchant: { clearMerchantData },
    },
    asyncActions: {
      Merchant: { getGroup },
    },
  } = useStore((store) => ({
    Merchant: store.MerchantEntity,
    Device: store.DeviceEntity,
  }));
  const [modals, setModals] = useReducer(
    (oldState: IMerchantGroupState, newState: Partial<IMerchantGroupState>): IMerchantGroupState => ({
      ...oldState,
      ...newState,
    }),
    {
      sort: false,
      filter: false,
    },
  );
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<number[]>([0, 1]);
  const filterValues = ["Product card", "Donation card"];
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const sortValues = ["Newest", "Oldest", "Name: A - Z", "Name: Z - A"];
  const windowSize = useWindowSize();
  const [index, setIndex] = useState<number>(1);

  const preparedItems: ICard[] = useMemo(() => {
    if (!group?.cards || !group) return [];
    let rawItems = [...group.cards];
    filterValues.forEach((_, idx) => {
      if (!selectedFilter.includes(idx)) {
        rawItems = filter[filterValues[idx]](rawItems);
      }
    });
    const notArchived = [...rawItems].filter((el) => el.status.title !== "Archived");
    return sort[sortValues[selectedSort]](notArchived);
  }, [group, selectedSort, selectedFilter, index]);

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
  }, [windowSize, group?.cards]);

  const pageItems = useMemo(() => {
    return preparedItems.slice((index - 1) * pageItemsCount, pageItemsCount * index);
  }, [preparedItems, pageItemsCount]);

  useEffect(() => {
    dispatch(getGroup({ id: +id }));

    return () => {
      dispatch(clearMerchantData());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
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
              <p className={styles.textSort}>Filters</p>
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
        </div>
        <div className={styles.btnBlock}>
          <MerchantUserInfo userData={profile!} />
        </div>
      </div>
      <div className={styles.cardContainer}>
        {pageItems.map((el, idx) => (
          <MerchantGroupItem key={idx} data={el} />
        ))}
      </div>
      {pageItems.length > 0 && (
        <div>
          <Pagination
            active={index}
            setActive={(idx: number) => setIndex(idx)}
            pageCount={Math.ceil(preparedItems.length / pageItemsCount)}
          />
        </div>
      )}
    </div>
  );
};
