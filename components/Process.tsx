import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from '../contexts/LanguageContext';

const Card = ({ step }: { step: { title: string; description: string; } }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
        <h3 className="text-xl font-bold text-brand-dark-blue dark:text-gray-100">{step.title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>
    </div>
);


const Process: React.FC = () => {
    const { t } = useTranslation();

    const processSteps = [
        {
            title: t('process.step1.title'),
            description: t('process.step1.description'),
        },
        {
            title: t('process.step2.title'),
            description: t('process.step2.description'),
        },
        {
            title: t('process.step3.title'),
            description: t('process.step3.description'),
        },
        {
            title: t('process.step4.title'),
            description: t('process.step4.description'),
        },
        {
            title: t('process.step5.title'),
            description: t('process.step5.description'),
        },
    ];

    return (
        <section id="process" className="bg-gray-100 dark:bg-black py-20 sm:py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-blue dark:text-white">{t('process.title')}</h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('process.subtitle')}</p>
                </motion.div>

                <div className="relative">
                    {/* Vertical line */}
                    <div 
                        className="absolute top-0 h-full w-0.5 bg-gray-300 dark:bg-gray-600 left-4 md:left-1/2 md:-translate-x-1/2"
                        aria-hidden="true"
                    ></div>

                    <div className="space-y-16">
                        {processSteps.map((step, index) => {
                            const isLeftAlignedOnDesktop = index % 2 !== 0;

                            const desktopVariants: Variants = {
                                offscreen: {
                                    opacity: 0,
                                    x: isLeftAlignedOnDesktop ? -50 : 50
                                },
                                onscreen: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.8 }
                                }
                            };
                            
                            const mobileVariants: Variants = {
                                offscreen: { opacity: 0, x: 20 },
                                onscreen: {
                                    opacity: 1,
                                    x: 0,
                                    transition: { type: 'spring', stiffness: 100, damping: 20, duration: 0.8 },
                                },
                            };
                            
                            const Marker = () => (
                                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-pink ring-8 ring-gray-100 dark:ring-black flex items-center justify-center text-white font-bold shadow-lg z-10">
                                    {index + 1}
                                </div>
                            );

                            return (
                                <div key={index} className="relative">
                                    {/* --- MOBILE VIEW --- */}
                                    <div className="md:hidden">
                                        <Marker />
                                        <motion.div
                                            className="ml-12"
                                            initial="offscreen"
                                            whileInView="onscreen"
                                            viewport={{ once: true, amount: 0.3 }}
                                            variants={mobileVariants}
                                        >
                                            <Card step={step} />
                                        </motion.div>
                                    </div>

                                    {/* --- DESKTOP VIEW --- */}
                                    <div className="hidden md:grid md:grid-cols-2 md:gap-x-16 relative items-start">
                                        {isLeftAlignedOnDesktop ? (
                                            <>
                                                <motion.div
                                                    className="text-right"
                                                    initial="offscreen"
                                                    whileInView="onscreen"
                                                    viewport={{ once: true, amount: 0.5 }}
                                                    variants={desktopVariants}
                                                >
                                                   <div className="inline-block text-left w-full"><Card step={step} /></div>
                                                </motion.div>
                                                <div></div> {/* Spacer */}
                                            </>
                                        ) : (
                                            <>
                                                <div></div> {/* Spacer */}
                                                <motion.div
                                                    initial="offscreen"
                                                    whileInView="onscreen"
                                                    viewport={{ once: true, amount: 0.5 }}
                                                    variants={desktopVariants}
                                                >
                                                    <Card step={step} />
                                                </motion.div>
                                            </>
                                        )}
                                        {/* Desktop Marker is absolutely positioned within the grid to ensure centering */}
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full flex items-start">
                                            <Marker />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;