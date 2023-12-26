import { Minus, Plus } from "Components/Assets";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import styles from "./styles.module.css";

interface CounterProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  maxAmount: number;
}

export const Counter: FC<CounterProps> = ({ amount, setAmount, maxAmount }) => {
  const clickHandler = useCallback(
    (value: number) => {
      setAmount((prev) => prev + value);
    },
    [amount, maxAmount],
  );

  return (
    <div className={styles.container}>
      <div className={styles.minus} onClick={() => amount !== 1 && clickHandler(-1)}>
        <Minus />
      </div>
      <div className={styles.amount}>
        <p>{amount}</p>
      </div>
      <div className={styles.plus} onClick={() => amount < maxAmount && clickHandler(1)}>
        <Plus />
      </div>
    </div>
  );
};
