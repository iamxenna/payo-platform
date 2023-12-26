import { useCallback, useEffect, useReducer, useState } from "react";
import { ValidationUnit, Return, EventType } from "./useValidation.interfaces";

function useValidation<V extends object>(initValues: V, validationRules: ValidationUnit<V>) {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const [values, dispatch] = useReducer(
    (oldState: V, newState: Partial<V>) => ({
      ...oldState,
      ...newState,
    }),
    { ...initValues },
  );

  const [errors, setErrors] = useReducer(
    (oldErrors: Return<V>, newErrors: Partial<Return<V>>): Return<V> => ({
      ...oldErrors,
      ...newErrors,
    }),
    (() => {
      const result = {};
      Object.keys(initValues).forEach((el) => ((result as any)[`${el}Error`] = ""));
      return result as Return<V>;
    })(),
  );

  useEffect(() => {
    try {
      Object.keys(validationRules).forEach((el) => {
        validationRules[el as keyof V]!.forEach(({ func, errorText }) => {
          if (errorText !== "Value is required") return;
          const validationResult = func({ target: { value: values[el as unknown as never] } });
          if (!validationResult) {
            throw new Error();
          }
        });
      });
      Object.keys(errors).forEach((el) => {
        if (errors[el as keyof typeof errors].length > 0) throw new Error();
      });
      setIsSubmit(true);
    } catch (err) {
      setIsSubmit(false);
    }
  }, [validationRules, values]);

  const changeValidationError = (id: string, errMessage: string) => {
    const error = {};
    (error as any)[`${id}Error`] = errMessage;
    setErrors(error);
  };

  const changeValidationValue = (ev: EventType) => {
    const mutation: any = {};
    mutation[ev.target.id] = ev.target.value;
    dispatch(mutation);
  };

  const validate = useCallback(
    (ev: EventType) => {
      const rules = validationRules[ev.target.id as keyof V];

      if (rules!.length <= 0) {
        changeValidationValue(ev);
        return;
      }

      try {
        rules?.forEach(({ func, errorText, skip }) => {
          const validationResult = func(ev);
          if (!validationResult) {
            if (skip) {
              changeValidationValue(ev);
            }
            throw new Error(errorText);
          }
        });
        changeValidationValue(ev);
        changeValidationError(ev.target.id, "");
        return true;
      } catch (err) {
        if (!(err instanceof Error)) return;
        changeValidationError(ev.target.id, err.message);
        setIsSubmit(false);
        return false;
      }
    },
    [validationRules],
  );

  return {
    values,
    validationDispatch: dispatch,
    isSubmit,
    validate,
    errors,
  };
}

export { useValidation };
