import React, { createContext, useEffect } from 'react';

import usePersistentState from './../hooks/PersistentState';
import { dark, light } from '../themes/Theme';
import { translations } from '../data/i18n';

export const AppContext = createContext({
  isDark: Boolean,
  setIsDark: () => {},
  lang: 'es',
  setLang: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = usePersistentState('theme', true); // default: dark mode
  const [lang, setLang] = usePersistentState('lang', 'es'); // default: Spanish
  const theme = isDark ? dark : light;
  const t = translations[lang] || translations.es;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const isMobile = window.matchMedia('(max-device-width: 820px) and (-webkit-min-device-pixel-ratio: 2)').matches;

  return (
    <AppContext.Provider value={{ isDark, setIsDark, theme, isMobile, lang, setLang, t }}>
      {children}
    </AppContext.Provider>
  );
};
