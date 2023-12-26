import { ReactNode } from "react";

interface ConfirmModalProps {
  text: ReactNode;
  onAccept(): void;
  onReject(): void;
}

export type { ConfirmModalProps };
