import React from "react";
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
    <div>
      <h2 className="text-3xl font-bold text-center mb-12 text-pink-400">
        Why Build Good Habits?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {benefits.map((item) => (
          <div
            key={item.id}
            className="card w-72 bg-base-100 shadow-lg hover:shadow-2xl border border-pink-300 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="card-body items-center text-center">
              {/* Lottie Animation */}
              <div className="w-28 h-28 mb-2">
                <Lottie animationData={item.lottie} loop={true} />
              </div>

              {/* Icon */}
              <div className="mt-1">{item.icon}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-3 text-gray-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyBuildCrd;
