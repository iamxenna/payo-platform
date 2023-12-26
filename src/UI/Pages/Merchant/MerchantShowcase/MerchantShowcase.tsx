import { Filter, MiniArrow, Sort } from "Components/Assets";
import { MerchantUserInfo } from "Components/MerchantUserInfo/MerchantUserInfo";
import { FilterModal } from "Components/Modals/FilterModal/FilterModal";
import { FilterRespModal } from "Components/Modals/FilterRespModal/FilterRespModal";
import { SortModal } from "Components/Modals/SortModal/SortModal";
import { IItem } from "Core/Showcase/ShowcaseEntity";
import { useStore } from "Core/store";
import { filter, sort } from "Pages/Showcase/Showcase.constants";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IShowcaseMerchantState } from "./MerchantShowcase.interfaces";
import { MerchantShowcaseItem } from "./MerchantShowcaseItem/MerchantShowcaseItem";

import styles from "./styles.module.css";
import { Pagination } from "Components/Paginations/Pagination";
import { useWindowSize } from "hooks/useWindowSize";

export const MerchantShowcase = () => {
  const dispatch = useDispatch();
  const { id, userName } = useParams<{ id: string; userName: string }>();
  const [modals, setModals] = useReducer(
    (oldState: IShowcaseMerchantState, newState: Partial<IShowcaseMerchantState>): IShowcaseMerchantState => ({
      ...oldState,
      ...newState,
    }),
    {
      sort: false,
      filter: false,
    },
  );
  const [selectedSort, setSelectedSort] = useState<number>(0);
  const sortValues = ["Newest", "Oldest", "Name: A - Z", "Name: Z - A"];

  const [index, setIndex] = useState<number>(1);
  const [selectedFilter, setSelectedFilter] = useState<number[]>([0, 1, 2]);
  const filterValues = ["Group", "Product card", "Donation card"];
  const windowSize = useWindowSize();

  const {
    store: {
      Merchant: { showcase, profile },
      Device: { isMobile },
    },
    actions: {
      Merchant: { clearMerchantData },
    },
    asyncActions: {
      Merchant: { getShowcase },
    },
  } = useStore((store) => ({
    Merchant: store.MerchantEntity,
    Device: store.DeviceEntity,
  }));

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
  }, [windowSize]);

  useEffect(() => {
    dispatch(getShowcase({ id: +id }));

    return () => {
      dispatch(clearMerchantData());
    };
  }, []);

  const preparedItems: IItem[] = useMemo(() => {
    if (!showcase) return;
    const filteredValues: IItem[] = [];
    selectedFilter.forEach((el) => {
      const values = filter[filterValues[el]]([...showcase]);
      filteredValues.push(...values);
    });
    return sort[sortValues[selectedSort]](filteredValues);
  }, [selectedFilter, selectedSort, showcase, index]);

  const pageItems = useMemo(() => {
    return preparedItems.slice((index - 1) * pageItemsCount, pageItemsCount * index);
  }, [preparedItems, pageItemsCount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.sortContainer}>
          <SortModal
            sortValues={sortValues}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            isOpen={modals.sort}
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
          <MerchantShowcaseItem key={idx} userName={userName} type={el.type} data={el} />
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
