import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaUserCircle, FaFire, FaTag, FaCalendarCheck } from "react-icons/fa";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await axios.get(
          `https://habit-tracker-one-ashen.vercel.app/habit/${id}`
        );
        setHabit(res.data);
        const today = new Date().toISOString().split("T")[0];
        setCompletedToday(res.data.completionHistory?.includes(today));
      } catch (error) {
        toast.error("Failed to load habit details!");
      } finally {
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id]);

  const handleMarkComplete = async () => {
    if (completedToday) {
      toast.info("Already marked complete for today!");
      return;
    }
    try {
      const res = await axios.put(
        `https://habit-tracker-one-ashen.vercel.app/habit/complete/${habit._id}`
      );
      const updatedHabit = {
        ...habit,
        completionHistory: res.data.completionHistory,
        currentStreak: res.data.currentStreak,
      };
      setHabit(updatedHabit);

      const today = new Date().toISOString().split("T")[0];
      setCompletedToday(updatedHabit.completionHistory.includes(today));

      toast.success("Marked as complete!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to mark complete!");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!habit)
    return (
      <div className="text-center text-3xl font-bold text-pink-400 py-10 h-screen mt-10">
        Habit not found! Go to home/Public habit and click the details <br />
        <Link
          className="btn bg-pink-400 text-white mt-4 px-6 py-3 rounded-full"
          to={"/"}
        >
          Go to Home
        </Link>
      </div>
    );

  const last30 = habit.completionHistory?.slice(-30) || [];
  const progress = (last30.length / 30) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 mt-10">
      <motion.img
        src={habit.image}
        alt={habit.title}
        className="w-full h-64 object-cover rounded-xl mb-4 shadow-md"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      <h1 className="text-3xl font-semibold mb-2 text-gray-800 dark:text-white">
        {habit.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {habit.description}
      </p>

      {/* Category */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        <FaTag className="text-pink-500" />
        <span>Category: {habit.category}</span>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1 text-gray-700 dark:text-gray-300">
          <span>
            <FaCalendarCheck className="inline mr-1 text-green-500" />
            Progress (last 30 days)
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full dark:bg-gray-700">
          <div
            className="h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Streak */}
      <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <FaFire className="text-red-500" />
        <span>Streak: {habit.currentStreak || 0} days</span>
      </div>

      {/* Creator Info */}
      <div className="mt-4 border-t pt-3 flex items-center gap-3 text-gray-700 dark:text-gray-300">
        {habit.creatorPhoto ? (
          <img
            src={habit.creatorPhoto}
            alt={habit.creatorName}
            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
        <div>
          <p className="font-medium">{habit.creatorName || "Unknown"}</p>
          <p className="text-sm">{habit.creatorEmail}</p>
        </div>
      </div>

      {/* Mark Complete Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleMarkComplete}
        disabled={completedToday}
        className={`mt-5 w-full py-2 rounded-full text-white font-medium ${
          completedToday
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-red-600 hover:opacity-90"
        }`}
      >
        {completedToday ? "Completed Today ✅" : "Mark Complete"}
      </motion.button>
    </div>
  );
};

export default HabitDetails;
