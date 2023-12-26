import React, { FC, useCallback, useRef, useState } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { Button } from "Components/Button/Button";
import Select, { Option } from "Components/Select/Select";
import { CalendarModal } from "Components/Modals/CalendarModal/CalendarModal";
import { useClickOutside } from "hooks/useClickOutside";
import { useStore } from "Core/store";
import { ExportBackArrow } from "Components/Assets/ExportBackArrow";
import { RadioButton } from "Components/RadioButton/RadioButton";
import { HttpClient } from "libs/HttpClient";
import { Notification } from "libs/Notification";

interface IExportModal {
  close(): void;
}
export const ExportModal: FC<IExportModal> = ({ close }) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("Excel");
  const [isOpenCalendarModal, setIsOpenCalendarModal] = useState<"to" | "from" | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const exportTypes = ["Excel", "CSV"];
  const calendarModalRef = useRef<HTMLDivElement>(null);

  const {
    store: {
      Device: { isMobile },
    },
  } = useStore((store) => ({
    Device: store.DeviceEntity,
  }));

  useClickOutside(calendarModalRef, (ev) => {
    if (!calendarModalRef.current?.contains(ev.target as Node)) {
      close();
    }
  });

  const getClickHandler = useCallback(async () => {
    const { data } = await HttpClient.post("/uploadData/dashboard", {
      type: selectedType === "Excel" ? "xlsx" : "csv",
      from: fromDate,
      to: toDate,
    });
    if (data) {
      window.open(`${process.env.REACT_APP_API_HOST}/uploadData/${data.file}`, "_blank");
      Notification.success("Data exported successfully");
      return;
    }
    Notification.error("Data export failed");
  }, [fromDate, toDate, selectedType]);

  const changeDateHandler = (value: Date) => {
    if (isOpenCalendarModal === "to") {
      setToDate(value);
    } else {
      setFromDate(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={classNames(styles.content)} ref={calendarModalRef}>
        {isMobile && (
          <div className={styles.arrow} onClick={() => close()}>
            <ExportBackArrow />
          </div>
        )}
        <p className={styles.title}>Export</p>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Period</p>
          <div className={styles.buttonBlockContainer}>
            <div className={styles.buttonBlock} onClick={() => setIsOpenCalendarModal("from")}>
              <p className={styles.dimText}>From: {fromDate?.toLocaleDateString()}</p>
            </div>
            <div className={styles.buttonBlock} onClick={() => setIsOpenCalendarModal("to")}>
              <p className={styles.dimText}>To: {toDate?.toLocaleDateString()}</p>
            </div>
          </div>
          <div className={styles.archived}>
            <Checkbox isOn={showArchived} onClick={() => setShowArchived(!showArchived)} />
            <p className={styles.archivedTitle}>upload for all time</p>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <p className={styles.inputLabel}>Format</p>
          <div className={styles.buttonBlockContainer}>
            {!isMobile ? (
              <Select
                value={selectedType}
                customClassName={styles.buttonBlock}
                onChange={(value) => setSelectedType(value.toString())}
              >
                {exportTypes.map((el, idx) => (
                  <Option value={el} key={idx}>
                    {el}
                  </Option>
                ))}
              </Select>
            ) : (
              <div className={styles.exportContainer}>
                {exportTypes.map((el, idx) => (
                  <div key={idx} className={styles.radioContainer}>
                    <RadioButton isOn={selectedType === el} onClick={() => setSelectedType(el)} />
                    {el}
                  </div>
                ))}
              </div>
            )}
            {!isMobile && (
              <Button variant={"gradient"} opClassName={styles.button} onClick={getClickHandler}>
                Export
              </Button>
            )}
          </div>
        </div>
        {isMobile && (
          <Button variant={"gradient"} opClassName={styles.button} onClick={getClickHandler}>
            Export
          </Button>
        )}
        <CalendarModal
          isOpen={isOpenCalendarModal}
          values={{ to: toDate, from: fromDate }}
          setIsOpen={() => setIsOpenCalendarModal(null)}
          setDate={(value: Date) => changeDateHandler(value)}
        >
          {" "}
        </CalendarModal>
      </div>
    </div>
  );
};
