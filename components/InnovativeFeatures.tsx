import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { CalendarPlus, Bot, Lightbulb, ChevronDown, AppWindow, Languages } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';

interface Feature {
  icon: React.ReactNode;
  title: string;
  summary: string;
  details: string;
  color: string;
  learnMore: string;
}

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const [isExpanded, setExpanded] = useState(false);
  
  const colorClasses = {
    'brand-purple': 'border-brand-purple/50 hover:bg-brand-purple/5 dark:hover:bg-brand-purple/10',
    'brand-magenta': 'border-brand-magenta/50 hover:bg-brand-magenta/5 dark:hover:bg-brand-magenta/10',
    'brand-pink': 'border-brand-pink/50 hover:bg-brand-pink/5 dark:hover:bg-brand-pink/10',
    'brand-orange': 'border-brand-orange/50 hover:bg-brand-orange/5 dark:hover:bg-brand-orange/10',
    'brand-teal': 'border-brand-teal/50 hover:bg-brand-teal/5 dark:hover:bg-brand-teal/10'
  };

  const iconColorClasses = {
    'brand-purple': 'text-brand-purple',
    'brand-magenta': 'text-brand-magenta',
    'brand-pink': 'text-brand-pink',
    'brand-orange': 'text-brand-orange',
    'brand-teal': 'text-brand-teal'
  }

  const currentBorderColor = colorClasses[feature.color as keyof typeof colorClasses];
  const currentIconColor = iconColorClasses[feature.color as keyof typeof iconColorClasses];

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!isExpanded)}
      className={`p-6 rounded-xl border-2 ${currentBorderColor} bg-white dark:bg-gray-800/50 cursor-pointer transition-colors duration-300 shadow-sm`}
      transition={{ layout: { duration: 0.3, ease: 'easeOut' } }}
    >
      <motion.div layout="position" className="flex justify-between items-start">
        <div className="flex items-start gap-4">
            <div className={currentIconColor}>{feature.icon}</div>
            <div>
                <h3 className="text-lg font-bold text-brand-dark-blue dark:text-gray-100">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{feature.summary}</p>
            </div>
        </div>
        <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4 mt-1"
        >
            <ChevronDown className="text-gray-500" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feature.details}</p>
                <a href="#" className="text-brand-pink hover:underline font-semibold mt-3 inline-block">{feature.learnMore} &rarr;</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InnovativeFeatures: React.FC = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    const { t } = useTranslation();

    const features: Feature[] = [
      {
        icon: <CalendarPlus size={32} />,
        title: t('innovativeFeatures.feature1.title'),
        summary: t('innovativeFeatures.feature1.summary'),
        details: t('innovativeFeatures.feature1.details'),
        learnMore: t('innovativeFeatures.feature1.learnMore'),
        color: 'brand-purple',
      },
      {
        icon: <Bot size={32} />,
        title: t('innovativeFeatures.feature2.title'),
        summary: t('innovativeFeatures.feature2.summary'),
        details: t('innovativeFeatures.feature2.details'),
        learnMore: t('innovativeFeatures.feature2.learnMore'),
        color: 'brand-magenta',
      },
      {
        icon: <Lightbulb size={32} />,
        title: t('innovativeFeatures.feature3.title'),
        summary: t('innovativeFeatures.feature3.summary'),
        details: t('innovativeFeatures.feature3.details'),
        learnMore: t('innovativeFeatures.feature3.learnMore'),
        color: 'brand-pink',
      },
      {
        icon: <AppWindow size={32} />,
        title: t('innovativeFeatures.feature4.title'),
        summary: t('innovativeFeatures.feature4.summary'),
        details: t('innovativeFeatures.feature4.details'),
        learnMore: t('innovativeFeatures.feature4.learnMore'),
        color: 'brand-orange',
      },
      {
        icon: <Languages size={32} />,
        title: t('innovativeFeatures.feature5.title'),
        summary: t('innovativeFeatures.feature5.summary'),
        details: t('innovativeFeatures.feature5.details'),
        learnMore: t('innovativeFeatures.feature5.learnMore'),
        color: 'brand-teal',
      },
    ];

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
          },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

  return (
    <section id="features" className="py-20 sm:py-24 bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white">{t('innovativeFeatures.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('innovativeFeatures.subtitle')}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto space-y-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InnovativeFeatures;