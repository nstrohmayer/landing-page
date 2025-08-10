import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { useSubmissions } from '../contexts/SubmissionsContext';

interface IdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IdeaModal: React.FC<IdeaModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { addSubmission } = useSubmissions();
  const [isSubmitted, setSubmitted] = useState(false);
  const [idea, setIdea] = useState('');
  const [automation, setAutomation] = useState('');
  const [contact, setContact] = useState('');
  const [isContactInvalid, setContactInvalid] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setIdea('');
        setAutomation('');
        setContact('');
        setContactInvalid(false);
      }, 300); // Wait for closing animation
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contact) {
      setContactInvalid(true);
      return;
    }
    addSubmission({ idea, automation, contact });
    setSubmitted(true);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
    if (e.target.value) {
        setContactInvalid(false);
    }
  }

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={t('modal.closeButton')}
            >
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="p-8"
                >
                  <h2 className="text-2xl font-bold text-brand-dark-blue dark:text-white mb-6">
                    {t('modal.title')}
                  </h2>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('modal.ideaLabel')}
                        </label>
                        <textarea
                          id="idea"
                          rows={3}
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="automation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('modal.automationLabel')}
                        </label>
                        <textarea
                          id="automation"
                          rows={3}
                          value={automation}
                          onChange={(e) => setAutomation(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('modal.contactLabel')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="contact"
                          value={contact}
                          onChange={handleContactChange}
                          placeholder={t('modal.contactPlaceholder')}
                          required
                          className={`w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-brand-pink focus:border-brand-pink transition-colors ${
                            isContactInvalid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                        />
                         {isContactInvalid && <p className="text-red-500 text-sm mt-1">This field is required.</p>}
                      </div>
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-brand-magenta transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink dark:focus:ring-offset-gray-800"
                      >
                        {t('modal.sendButton')}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="p-8 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="text-green-500" size={64} />
                  </div>
                  <h2 className="text-2xl font-bold text-brand-dark-blue dark:text-white mb-2">
                    {t('modal.successTitle')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    {t('modal.successMessage')}
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md hover:bg-brand-magenta transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink dark:focus:ring-offset-gray-800"
                  >
                    {t('modal.closeButton')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IdeaModal;