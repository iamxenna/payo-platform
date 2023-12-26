import { useEffect } from "react";

export const useAsyncEffect = (callback: () => Promise<void>, deps: Array<any>) => {
  return useEffect(() => {
    (async () => {
      await callback();
    })();
  }, deps);
};
