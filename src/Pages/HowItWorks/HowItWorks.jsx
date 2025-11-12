import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Track Daily Habits",
      description:
        "Log your daily routines and monitor your progress effectively.",
      icon: "📅",
    },
    {
      id: 2,
      title: "Analyze Progress",
      description: "Visualize streaks and identify areas of improvement.",
      icon: "📈",
    },
    {
      id: 3,
      title: "Achieve Goals",
      description: "Stay consistent and accomplish meaningful personal goals.",
      icon: "🏆",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-pink-500">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl border border-pink-300 p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300"
          >
            {/* Icon */}
            <div className="text-5xl mb-4">{step.icon}</div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
