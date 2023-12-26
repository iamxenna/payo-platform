type themes = "dark" | "light";

type languages = "en";

interface IAppEntityState {
  theme: themes;
  language: languages;
}

export type { IAppEntityState, themes, languages };
