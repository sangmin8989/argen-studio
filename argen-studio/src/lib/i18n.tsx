'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

interface I18nContextType {
  lang: Lang;
  toggle: () => void;
  t: (ko: string, en: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'ko',
  toggle: () => {},
  t: (ko) => ko,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
  }, []);

  const t = useCallback(
    (ko: string, en: string) => (lang === 'ko' ? ko : en),
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLang() {
  return useContext(I18nContext);
}
