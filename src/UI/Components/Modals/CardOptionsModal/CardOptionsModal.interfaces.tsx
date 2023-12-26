import { ModalProps } from "utils/i.modal";

interface IOption {
  title: string;
  onClick(): void;
  onMobile?: boolean;
  isRed?: boolean;
}

interface CardOptionsModalProps extends ModalProps {
  options: IOption[];
}

export type { CardOptionsModalProps, IOption };
