interface IStatus {
  id: number;
  title: string;
}

interface IStatusState {
  statuses: IStatus[];
}

export type { IStatus, IStatusState };
