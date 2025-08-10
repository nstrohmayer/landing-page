import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-black py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {t('footer.copyright').replace('{year}', year.toString())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;