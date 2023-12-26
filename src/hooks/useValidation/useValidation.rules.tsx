import { ChangeEvent } from "react";
import { EventType } from "./useValidation.interfaces";
import { ALLOWED_SIZES } from "utils/allowedSizes";

const ValidationRules = {
  REQUIRED: {
    OPTIONAL: (condition: boolean) => ({
      func: ({ target }: EventType) => (condition ? true : target.value.length > 0),
      errorText: "Value is required",
      skip: true,
    }),
    ALWAYS: {
      func: ({ target }: EventType) => target.value.length > 0,
      errorText: `Value is required`,
      skip: true,
    },
  },

  MAX: {
    LENGTH: (num: number) => ({
      func: ({ target }: EventType) => target.value.length <= num,
      errorText: `Value must be shorter than ${num} symbols`,
      skip: false,
    }),
    VALUE: (num: number) => ({
      func: ({ target }: EventType) => +target.value <= num,
      errorText: `Value must be less than ${num}`,
      skip: false,
    }),
  },

  MIN: {
    LENGTH: (num: number) => ({
      func: ({ target }: EventType) => target.value.length >= num,
      errorText: `Value must be longer than ${num} symbols`,
      skip: true,
    }),
    VALUE: (num: number) => ({
      func: ({ target }: EventType) => +target.value >= num,
      errorText: `Value must be greater than ${num}`,
      skip: true,
    }),
  },

  IS: {
    IMAGE: {
      VALID_SIZE: (num: number) => ({
        func: ({ target }: ChangeEvent<HTMLInputElement>) => target.files![0].size < num,
        errorText: "File is too large",
        skip: true,
      }),
      VALID_TYPE: {
        func: ({ target }: ChangeEvent<HTMLInputElement>) => ALLOWED_SIZES.includes(target.files![0].type),
        errorText: "Invalid file extension",
        skip: true,
      },
    },
    NATURAL: {
      func: ({ target }: EventType) => !target.value.includes(".") && !target.value.includes(","),
      errorText: `Value is not number`,
      skip: false,
    },
    DECIMAL: {
      WITH_COMMA: (num1: number, num2: number) => ({
        func: ({ target }: EventType) =>
          target.value!.includes(".") && target.value[6] === "."
            ? target.value.length <= num2
            : target.value.length <= num1,
        errorText: `Value is not valid`,
        skip: false,
      }),
    },
    EMAIL: {
      func: ({ target }: EventType) => target.value.includes("@"),
      errorText: `Value is not email`,
      skip: true,
    },
  },
} as const;

export { ValidationRules };
