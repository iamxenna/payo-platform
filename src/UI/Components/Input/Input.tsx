import React, { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { useStore } from "Core/store";
import { File } from "Components/Assets";
import { MiniArrow } from "Components/Assets";
import { Button } from "Components/Button/Button";
import { ALLOWED_SIZES } from "utils/allowedSizes";
import { ErrorPopup } from "Components/ErrorPopup/ErrorPopup";
import { RegexpValidator } from "libs/Validation/RegexpValidator";

import styles from "./styles.module.css";

interface IInput {
  variant: "default" | "bigText" | "file" | "emailInput";
  type: string;
  title?: string | null;
  isImportant?: boolean;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onButtonClick?: () => void;
  placeholder: string;
  classWrapper?: string;
  withButton?: boolean;
  classButton?: string;
  isUsername?: boolean;
  isLink?: boolean;
  max?: number;
  min?: number;
  withoutValidation?: boolean;
  error?: string;
  id?: string;
}

export const Input: FC<IInput> = ({
  variant,
  type,
  placeholder,
  onChange,
  value,
  disabled = false,
  title = "",
  isImportant = false,
  isUsername = false,
  onButtonClick = () => undefined,
  classWrapper = "",
  classButton = "",
  withButton = false,
  isLink = false,
  max = 30,
  min,
  withoutValidation = false,
  error = "",
  id = "",
}) => {
  switch (variant) {
    case "default":
      return (
        <ErrorPopup text={error} isShow={!!error}>
          <div className={styles.defaultInputWrapper}>
            {title && (
              <label htmlFor={placeholder} className={styles.label}>
                {isImportant && <sup className={styles.important}>*</sup>}
                {title}
              </label>
            )}
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={onChange}
              className={classNames(
                styles.defaultInput,
                classWrapper,
                error && styles.errorInput,
                disabled && styles.disabled,
              )}
            />
          </div>
        </ErrorPopup>
      );
    case "emailInput":
      return (
        <ErrorPopup text={error} isShow={!!error}>
          <div className={classNames(styles.inputWrapper, disabled && styles.disabled)}>
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={classNames(error && styles.errorInput, styles.input, classWrapper)}
            />
            {withButton && (
              <div className={styles.btnSubmit}>
                <Button variant="primary" opClassName={classButton} onClick={onButtonClick}>
                  <span className={styles.arrow}>
                    <MiniArrow />
                  </span>
                </Button>
              </div>
            )}
          </div>
        </ErrorPopup>
      );
    case "bigText":
      return (
        <ErrorPopup text={error} isShow={!!error}>
          <div>
            {title && (
              <label htmlFor={placeholder} className={styles.label}>
                {isImportant && <sup className={styles.important}>*</sup>}
                {title}
              </label>
            )}
            <textarea
              id={id}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={onChange}
              className={classNames(
                styles.bigText,
                classWrapper,
                error && styles.errorInput,
                disabled && styles.disabled,
              )}
            />
          </div>
        </ErrorPopup>
      );
    case "file":
      return (
        <ErrorPopup text={error} isShow={!!error}>
          <div className={classNames(styles.defaultInput, error && styles.error, disabled && styles.disabled)}>
            <div className={styles.inputFilePlaceholder}>
              <div className={styles.icon}>
                <File />
              </div>
              <p>{placeholder}</p>
            </div>
            <input id={id} type="file" disabled={disabled} onChange={onChange} className={styles.fileInput} />
          </div>
        </ErrorPopup>
      );
  }
};
