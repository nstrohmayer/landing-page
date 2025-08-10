import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';
import IdeaModal from './IdeaModal';
import { Linkedin } from 'lucide-react';

const CTA: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <section id="cta" className="bg-brand-dark-blue">
        <div className="container mx-auto px-6 py-20 sm:py-24 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold text-white"
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
          >
            {t('cta.subtitle')}
          </motion.p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: '#f06285' }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.03, 1],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 2
                }
              }}
              className="inline-block bg-brand-pink text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg"
            >
              {t('cta.button')}
            </motion.button>
            <motion.a
              href="https://www.linkedin.com/in/nblauensteiner"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-bold py-3.5 px-8 rounded-full text-lg shadow-lg hover:bg-white hover:text-brand-dark-blue transition-colors duration-300"
            >
              <Linkedin size={20} />
              {t('modal.linkedinButton')}
            </motion.a>
          </div>
        </div>
      </section>
      <IdeaModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default CTA;