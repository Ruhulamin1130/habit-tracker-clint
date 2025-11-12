import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaSmileBeam, FaClock, FaBullseye } from "react-icons/fa";
import Lottie from "lottie-react";

// Vite-compatible JSON import
import focusAnim from "../../assets/lottie/Untitled file.json";
import stressAnim from "../../assets/lottie/stress.json" assert { type: "json" };
import timeAnim from "../../assets/lottie/time.json" assert { type: "json" };
import goalAnim from "../../assets/lottie/goal.json" assert { type: "json" };

const WhyBuildCrd = () => {
  const benefits = [
    {
      id: 1,
      title: "Better Focus",
      description: "Stay consistent and sharpen your attention every day.",
      icon: <FaBullseye className="text-pink-500 text-3xl" />,
      lottie: focusAnim,
    },
    {
      id: 2,
      title: "Reduced Stress",
      description: "Form healthy habits that naturally reduce your stress.",
      icon: <FaSmileBeam className="text-green-500 text-3xl" />,
      lottie: stressAnim,
    },
    {
      id: 3,
      title: "Time Management",
      description: "Track habits to manage your time smarter and better.",
      icon: <FaClock className="text-blue-500 text-3xl" />,
      lottie: timeAnim,
    },
    {
      id: 4,
      title: "Strong Mindset",
      description: "Build discipline and create a strong, positive mindset.",
      icon: <FaBrain className="text-purple-500 text-3xl" />,
      lottie: goalAnim,
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-pink-500 mb-12">
        Why Build Good Habits?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl border border-pink-300 p-6 flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-2"
          >
            {/* Lottie Animation */}
            <div className="w-28 h-28 mb-4">
              <Lottie animationData={item.lottie} loop={true} />
            </div>

            {/* Icon */}
            <div className="mb-2">{item.icon}</div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyBuildCrd;
