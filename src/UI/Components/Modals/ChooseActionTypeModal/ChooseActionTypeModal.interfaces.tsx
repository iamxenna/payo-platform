type IParam = {
  title: string;
  action(): void;
};

interface ChooseActionTypeModalProps {
  text: string | JSX.Element;
  params: IParam[];
  close(): void;
}

export type { ChooseActionTypeModalProps, IParam };
