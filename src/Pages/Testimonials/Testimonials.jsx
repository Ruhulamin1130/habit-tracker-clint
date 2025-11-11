import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Love Funny",
    text: "This app changed my productivity game! I can finally stick to my habits.",
  },
  {
    id: 2,
    name: "Jane Doe",
    text: "I feel more focused and less stressed thanks to habit tracking.",
  },
  {
    id: 3,
    name: "John Smith",
    text: "The visual analytics keeps me motivated every day.",
  },
];

const Testimonials = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-20 px-6"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-pink-400">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className="card p-6 bg-white shadow-lg border border-gray-200 text-center hover:shadow-2xl transition-all duration-300"
          >
            <p className="text-gray-600">{item.text}</p>
            <h4 className="mt-4 font-semibold text-gray-800">– {item.name}</h4>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;
