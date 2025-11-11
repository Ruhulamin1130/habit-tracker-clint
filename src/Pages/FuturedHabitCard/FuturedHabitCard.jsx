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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className="card w-80 bg-base-100 shadow-xl border border-pink-300 hover:shadow-2xl cursor-pointer"
    >
      {/* Image */}
      <figure>
        <motion.img
          src={
            habit.image ||
            "https://via.placeholder.com/400x250?text=Habit+Image"
          }
          alt={habit.title}
          className="h-48 w-full p-4  object-cover rounded-xl"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
      </figure>

      {/* Body */}
      <div className="card-body">
        <h2 className="card-title text-gray-800 text-lg font-semibold">
          {habit.title || "Untitled Habit"}
        </h2>

        <p className="text-gray-600 text-sm">
          {habit.description?.slice(0, 90) || "No description available..."}
        </p>

        {/* Creator Info */}
        <div className="flex items-center gap-3 mt-3">
          {habit.creatorPhoto ? (
            <img
              src={habit.creatorPhoto}
              alt={habit.creatorName}
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400" />
          )}
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              {habit.creatorName || "Unknown Creator"}
            </h3>
            <p className="text-xs text-gray-500">{habit.creatorEmail}</p>
          </div>
        </div>

        {/* View Details Button */}
        <div className="card-actions mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDetails}
            className="btn btn-sm bg-pink-500 hover:bg-pink-600 text-white w-full flex items-center justify-center gap-2 rounded-lg"
          >
            View Details
            <MdOutlineKeyboardArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FuturedHabitCard;
