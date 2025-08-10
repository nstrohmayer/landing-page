import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { MapPin } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../contexts/LanguageContext';
import SubmissionsModal from './SubmissionsModal';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmissionsModalOpen, setSubmissionsModalOpen] = useState(false);

  const handleLocationClick = () => {
    setSubmissionsModalOpen(true);
  };

  return (
    <>
      <header className="relative overflow-hidden">
        <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <div className="container mx-auto px-6 py-20 sm:py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 text-center md:text-left">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <img
                src="/assets/headshot.png"
                alt="Noah Blauensteiner"
                className="rounded-full w-48 h-48 md:w-56 md:h-56 object-cover shadow-2xl border-4 border-white dark:border-gray-700 mx-auto"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.3,
                  },
                },
              }}
            >
              <motion.h2
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white"
              >
                Noah Blauensteiner
              </motion.h2>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-500 dark:text-gray-400"
              >
                <button
                  onClick={handleLocationClick}
                  className="flex items-center gap-2 cursor-pointer rounded p-1 -ml-1 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Access submissions"
                >
                  <MapPin size={20} />
                  <span>{t('header.location')}</span>
                </button>
              </motion.div>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-6 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300"
              >
                {t('header.greeting')}
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <motion.a
                  href="#values"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="inline-block bg-brand-pink text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl hover:bg-brand-magenta transition-colors duration-300"
                >
                  {t('header.learnHow')}
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>
      <SubmissionsModal isOpen={isSubmissionsModalOpen} onClose={() => setSubmissionsModalOpen(false)} />
    </>
  );
};

export default Header;