import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Locale } from '../contexts/LanguageContext';
import { GBFlag, DEFlag, NLFlag } from './Flags';

const languages: Record<Locale, { name: string; flag: React.ReactNode }> = {
  en: { name: 'English', flag: <GBFlag className="w-5 h-auto rounded-sm" /> },
  de: { name: 'Deutsch', flag: <DEFlag className="w-5 h-auto rounded-sm" /> },
  nl: { name: 'Nederlands', flag: <NLFlag className="w-5 h-auto rounded-sm" /> },
};

const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleSetLocale = (lang: Locale) => {
    setLocale(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 flex items-center justify-center rounded-full text-brand-dark-blue dark:text-gray-300 bg-white/10 dark:bg-gray-800/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-purple"
        aria-label="Change language"
      >
        <Globe size={24} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 origin-top-right"
            onMouseLeave={() => setIsOpen(false)}
          >
            {Object.entries(languages).map(([lang, { name, flag }]) => (
              <li key={lang}>
                <button
                  onClick={() => handleSetLocale(lang as Locale)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 ${
                    locale === lang
                      ? 'font-bold text-brand-pink'
                      : 'text-gray-700 dark:text-gray-300'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  {flag}
                  <span>{name}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
