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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 px-6 "
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-400">
        How It Works
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-8 justify-items-center">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            whileHover={{ scale: 1.05 }}
            className="card w-72 bg-white shadow-lg border border-pink-300 p-6 text-center hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorks;
