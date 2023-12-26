import { RefObject, useCallback, useEffect } from "react";

export const useClickOutside = (rootRef: RefObject<Element>, handler: (ev: Event) => void): void => {
  const handleClickOutside = useCallback(
    (event: Event): void => {
      if (!rootRef.current || rootRef.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    },
    [rootRef, handler],
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [rootRef, handler, handleClickOutside]);
};
