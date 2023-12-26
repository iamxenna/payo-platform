import React, { memo, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import classNames from "classnames";
import type { IModalState } from "./Dashboard.interfaces";
import { SortModal } from "Components/Modals/SortModal/SortModal";
import styles from "./styles.module.css";
import { Filter, MiniArrow, Sort } from "Components/Assets";
import { FilterModal } from "Components/Modals/FilterModal/FilterModal";
import { Button } from "Components/Button/Button";
import { DashboardItem } from "Components/DashboardItem/DashboardItem";
import { ExportModal } from "Components/Modals/ExportModal/ExportModal";
import { useStore } from "Core/store";
import { Pagination } from "Components/Paginations/Pagination";
import { filter, sort } from "./Dashboard.contants";
import { FilterRespModal } from "Components/Modals/FilterRespModal/FilterRespModal";
import { IPurchase } from "Core/Transfer/TransferRepository";
import { SortRespModal } from "Components/Modals/SortRespModal/SortRespModal";

export const Dashboard = memo(() => {
  const pageItemsCount = 7;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState<number | null>(null);
  const [index, setIndex] = useState<number>(1);
  const [modals, setModals] = useReducer(
    (oldState: IModalState, newState: Partial<IModalState>): IModalState => ({ ...oldState, ...newState }),
    {
      sort: false,
      filter: false,
      export: false,
    },
  );

  const {
    store: {
      Device: { isMobile },
      Dashboard: { items },
      Profile: { email },
    },
    asyncActions: {
      Dashboard: { getDashboard },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
    Profile: store.ProfileEntity,
    Dashboard: store.DashboardEntity,
  }));

  const itemClickHandler = useCallback(
    (idx: number) => {
      if (isExpanded === idx) {
        return setIsExpanded(null);
      }
      return setIsExpanded(idx);
    },
    [isExpanded, setIsExpanded],
  );

  const [selectedSort, setSelectedSort] = useState<number>(0);
  const sortValues = ["Newest", "Oldest", "Amount: Low - High", "Amount: High - Low"];

  const [selectedFilter, setSelectedFilter] = useState<number[]>([0, 1, 2, 3]);
  const filterValues = ["Received", "Paid", "Product card", "Donation card"];

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  const preparedItems: IPurchase[] = useMemo(() => {
    let filteredValues: IPurchase[] = [...items];
    filterValues.forEach((_, idx) => {
      if (!selectedFilter.includes(idx)) {
        filteredValues = filter[filterValues[idx]](filteredValues, email);
      }
    });
    const sortedValues = sort[sortValues[selectedSort]](filteredValues);
    return sortedValues.slice((index - 1) * pageItemsCount, pageItemsCount * index);
  }, [items, index, email, filterValues]);

  const sortItems = useMemo(() => {
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
    );
  }, [filterValues, selectedFilter, setSelectedFilter, modals, setModals, isMobile]);

  return (
    <div className={classNames(styles.wrapper, items.length === 0 && styles.wrapperEmpty)}>
      {items?.length > 0 ? (
        <>
          <div className={styles.head}>
            {isMobile ? <h1 className={styles.title}>Dashboard</h1> : sortItems}
            <div className={styles.btnBlock}>
              <div className={styles.createBtnContainer}>
                <Button
                  variant="primary"
                  opClassName={classNames(styles.btn, styles.bs)}
                  onClick={() => setModals({ export: !modals.export })}
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
          {isMobile && <div>{sortItems}</div>}
          <div className={styles.itemsContainer}>
            {preparedItems.map((el, idx) => (
              <DashboardItem
                key={idx}
                isExpanded={isExpanded === idx}
                itemClickHandler={() => itemClickHandler(idx)}
                {...el}
              />
            ))}
          </div>
          <div>
            <Pagination
              active={index}
              setActive={(idx: number) => setIndex(idx)}
              pageCount={Math.ceil(items.length / pageItemsCount)}
            />
          </div>
          {modals.export && <ExportModal close={() => setModals({ export: false })} />}
        </>
      ) : (
        <div className={styles.dashboardContainer}>
          <h1 className={styles.titleEmpty}>{t("dashboard.title")}</h1>
          <p className={styles.textEmpty}>{t("dashboard.text")}</p>
        </div>
      )}
    </div>
  );
});
