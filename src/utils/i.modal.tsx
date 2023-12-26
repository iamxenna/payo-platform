import { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen(value?: boolean): void;
  children: ReactNode;
}

interface ModalProps extends BaseModalProps {
  variant?: "purple" | "light";
  position?: "left" | "center" | "right" | "rightCard";
}

export type { ModalProps, BaseModalProps };
