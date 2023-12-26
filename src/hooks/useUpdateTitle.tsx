import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const useUpdateTitle = (title: string | undefined): void => {
  const { t } = useTranslation();
  useEffect(() => {
    if (title === "index") {
      document.title = t(`pageTitles.${title}`);
      return;
    }
    document.title = `${t(`pageTitles.${title}`)} | Payo`;
  }, [title]);
};
