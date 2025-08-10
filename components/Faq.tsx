import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, index }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const variants: Variants = {
        hidden: { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };
    
    return (
        <motion.div 
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-brand-purple/10 transition-shadow duration-300"
        >
            <h3 className="text-xl font-bold text-brand-purple mb-4">
            "{question}"
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {answer}
            </p>
        </motion.div>
    );
};

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const faqs = [
    {
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white">{t('faq.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('faq.subtitle')}</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;