import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import { en, Translations } from '../locales/en';
import { de } from '../locales/de';
import { nl } from '../locales/nl';

export type Locale = 'en' | 'de' | 'nl';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Translations> = { en, de, nl };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedTranslation = (obj: any, path: string): string | undefined => {
  return path.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    const browserLang = navigator.language.split('-')[0] as Locale;
    
    if (storedLocale && ['en', 'de', 'nl'].includes(storedLocale)) {
      setLocale(storedLocale);
    } else if (['en', 'de', 'nl'].includes(browserLang)) {
      setLocale(browserLang);
    } else {
      setLocale('en');
    }
  }, []);

  const t = (key: string): string => {
    const translation = getNestedTranslation(translations[locale], key);
    if (translation) {
      return translation;
    }
    const fallback = getNestedTranslation(translations.en, key);
    return fallback || key;
  };
  
  const setLocaleAndStore = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const contextValue = useMemo(() => ({
    locale,
    setLocale: setLocaleAndStore,
    t,
  }), [locale]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};