type ITXStatus = "Success" | "Error" | null;

interface ITransferEntityState {
  txLoading: boolean;
  txStatus: ITXStatus;
}

interface TransactionData {
  network: number;
  token: string;
  to: string;
  amount: number;
}

export type { ITransferEntityState, ITXStatus, TransactionData };
