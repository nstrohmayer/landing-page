
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const faqs = [
    {
      question: "Why should I waste my time setting this prototype up with you?",
      answer: "You will 100% learn about how AI prompting works with modern tools so that you can tinker and finish your own ideas in your time—without having to pay me or anyone else."
    },
    {
      question: "How are you going to make money? You won't just do this for free, will you?",
      answer: "I want to spread knowledge on these topics and convince you of their value. If you feel you lack the time to go this journey alone, need support from my years of experience, or want my input for use cases and visualizing your ideas, then I'm happy to work together. That's when I make money with you."
    }
  ];

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white">Answering Your Questions</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">We believe in transparency. Here's what you might be thinking.</p>
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