import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X, Inbox } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { useSubmissions, Submission } from '../contexts/SubmissionsContext';

interface SubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionCard: React.FC<{ submission: Submission }> = ({ submission }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex justify-between items-start gap-4">
        <p className="text-sm font-semibold text-brand-dark-blue dark:text-gray-200 break-all">{submission.contact}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-right flex-shrink-0">
          {new Date(submission.timestamp).toLocaleString()}
        </p>
      </div>
      {submission.idea && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-300">Idea:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{submission.idea}</p>
        </div>
      )}
      {submission.automation && (
        <div className="mt-2">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-300">Automation/Digitalization:</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{submission.automation}</p>
        </div>
      )}
    </div>
  );
};

const SubmissionsModal: React.FC<SubmissionsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { submissions } = useSubmissions();

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            aria-modal="true"
            role="dialog"
          >
            <div className="p-6">
                <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label={t('modal.closeButton')}
                >
                <X size={24} />
                </button>
                <h2 className="text-2xl font-bold text-brand-dark-blue dark:text-white mb-6">
                    {t('submissionsModal.title')}
                </h2>

                {submissions.length > 0 ? (
                    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                        {submissions.map((sub) => (
                            <SubmissionCard key={sub.id} submission={sub} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Inbox size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
                        <p className="mt-4 text-gray-600 dark:text-gray-400">{t('submissionsModal.empty')}</p>
                    </div>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmissionsModal;
