function toPubChainId(str: number) {
  return `0x${str.toString(16)}`;
}

function toUsual(str: string) {
  if (str.includes("0x")) {
    return Number(str).toString();
  }
  return str;
}

export { toUsual, toPubChainId };
