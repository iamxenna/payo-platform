type IConfigType = {
  _chainToNumber: {
    [key: string]: string;
  };
  _numberToChain: {
    [key: string]: string;
  };
};

const config: { prod: IConfigType; dev: IConfigType } = {
  dev: {
    _chainToNumber: {
      BSC: "97",
      ETH: "1",
      Polygon: "80001",
    },
    _numberToChain: {
      97: "BSC",
      1: "ETH",
      80001: "Polygon",
    },
  },
  prod: {
    _chainToNumber: {
      BSC: "56",
      ETH: "1",
      Polygon: "137",
    },
    _numberToChain: {
      56: "BSC",
      1: "ETH",
      137: "Polygon",
    },
  },
};
class ChainConverter {
  private static readonly _converter = process.env.REACT_APP_NODE_ENV === "development" ? "dev" : "prod";

  public static convert(chain: any): string {
    if (typeof chain === "number") {
      return config[this._converter]._numberToChain[chain];
    }
    return config[this._converter]._chainToNumber[chain];
  }
}

export default ChainConverter;
