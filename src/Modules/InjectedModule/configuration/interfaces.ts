type INet = {
  name: string;
  currency: string;
  dec: number;
  rpc: string;
};

interface IConfig {
  networks: {
    [key: number]: INet;
  };
  payoContracts: {
    [key: number]: {
      transfer: {
        address: string;
        abi: any;
      };
    };
  };
  op: {
    [key: number]: {
      [key: string]: string;
    };
  };
}

export type { INet, IConfig };
