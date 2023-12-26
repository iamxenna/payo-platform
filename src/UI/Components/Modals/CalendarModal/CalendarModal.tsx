import React, { FC } from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import { HelpModal } from "Components/HOCs";
import { ModalProps } from "utils/i.modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { LeftArrow } from "Components/Assets/CalendarAssets/LeftArrow";
import { RightArrow } from "Components/Assets/CalendarAssets/RightArrow";

interface ICalendarProps extends Omit<ModalProps, "isOpen"> {
  setDate(value: Date): void;
  isOpen: "to" | "from" | null;
  values: {
    to: Date | null;
    from: Date | null;
  };
}

export const CalendarModal: FC<ICalendarProps> = ({ isOpen, setIsOpen, children, setDate, values }) => {
  return (
    <div className={classNames(styles.wrapper, isOpen === "to" && styles.to)}>
      {isOpen && (
        <div className={styles.content}>
          <HelpModal isOpen={!!isOpen} setIsOpen={setIsOpen}>
            <Calendar
              value={values[isOpen]}
              onClickDay={(data) => setDate(data)}
              prev2Label={null}
              prevLabel={<LeftArrow />}
              navigationLabel={({ date }) => (
                <p className={styles.title}>
                  {date.toLocaleString("en", { month: "short" })} {date.getFullYear()}
                </p>
              )}
              next2Label={null}
              nextLabel={<RightArrow />}
              tileClassName={styles.numbers}
              className={[styles.calendar, styles.weekdays, styles.weekday]}
              onChange={() => setIsOpen(false)}
              formatShortWeekday={(locale, date) => ["S", "M", "T", "W", "T", "F", "S"][date.getDay()]}
            />
          </HelpModal>
        </div>
      )}
      {children}
    </div>
  );
};
