interface IRates {
  USDT: number;
  USDC: number;
  DAI: number;
  BNB: number;
  ETH: number;
  BUSD: number;
  MATIC: number;
}

interface IRatesEntityState {
  rates: IRates | null;
}

export type { IRatesEntityState, IRates };
