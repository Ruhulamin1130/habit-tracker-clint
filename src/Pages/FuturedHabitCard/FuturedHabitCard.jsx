import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const FuturedHabitCard = ({ habit }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/habit/${habit._id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-pink-300 hover:shadow-2xl overflow-hidden cursor-pointer"
    >
      {/* Image with gradient overlay */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <motion.img
          src={
            habit.image ||
            "https://via.placeholder.com/400x250?text=Habit+Image"
          }
          alt={habit.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Body */}
      <div className="p-4 md:p-6 flex flex-col gap-3">
        <h2 className="text-gray-900 dark:text-white text-lg md:text-xl font-bold line-clamp-2">
          {habit.title || "Untitled Habit"}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3">
          {habit.description || "No description available..."}
        </p>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mt-2">
          {habit.creatorPhoto ? (
            <img
              src={habit.creatorPhoto}
              alt={habit.creatorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400" />
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {habit.creatorName || "Unknown Creator"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {habit.creatorEmail}
            </p>
          </div>
        </div>

        {/* View Details Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleViewDetails}
          className="mt-3 px-4 py-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all duration-300"
        >
          View Details
          <MdOutlineKeyboardArrowRight size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FuturedHabitCard;
