import React from 'react';
import { Target, Smartphone, GitBranch } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const valueCardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, color }) => {
  const colorClasses = {
    'brand-purple': {
      bg: 'bg-brand-purple/10 dark:bg-brand-purple/20',
      text: 'text-brand-purple'
    },
    'brand-magenta': {
        bg: 'bg-brand-magenta/10 dark:bg-brand-magenta/20',
        text: 'text-brand-magenta'
    },
    'brand-pink': {
        bg: 'bg-brand-pink/10 dark:bg-brand-pink/20',
        text: 'text-brand-pink'
    }
  };

  const currentClasses = colorClasses[color as keyof typeof colorClasses];


  return (
    <motion.div 
      className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-brand-pink/10 transition-shadow duration-300 flex flex-col items-center text-center h-full"
      variants={valueCardVariants}
    >
       <div className={`w-20 h-20 rounded-full flex items-center justify-center ${currentClasses.bg}`}>
        <div className={currentClasses.text}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold mt-6 mb-2 text-brand-dark-blue dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

const ValueProposition: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const values = [
    {
      icon: <Target size={40} />,
      title: t('valueProposition.card1.title'),
      description: t('valueProposition.card1.description'),
      color: 'brand-purple'
    },
    {
      icon: <Smartphone size={40} />,
      title: t('valueProposition.card2.title'),
      description: t('valueProposition.card2.description'),
      color: 'brand-magenta'
    },
    {
      icon: <GitBranch size={40} />,
      title: t('valueProposition.card3.title'),
      description: t('valueProposition.card3.description'),
      color: 'brand-pink'
    },
  ];

  return (
    <section id="values" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white">{t('valueProposition.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('valueProposition.subtitle')}</p>
        </motion.div>
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {values.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              color={value.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;