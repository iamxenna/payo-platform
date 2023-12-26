import React, { FC, useRef } from "react";
import { useClickOutside } from "hooks/useClickOutside";
import { BaseModalProps } from "utils/i.modal";

export const HelpModal: FC<BaseModalProps> = ({ children, setIsOpen }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, (ev) => {
    if (!modalRef.current?.contains(ev.target as Node)) {
      setIsOpen(false);
    }
  });

  return <div ref={modalRef}>{children}</div>;
};
