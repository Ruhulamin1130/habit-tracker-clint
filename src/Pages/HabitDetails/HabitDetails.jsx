import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/habit/${id}`);
        console.log(res.data);
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
    const today = new Date().toISOString().split("T")[0];

    if (completedToday) {
      toast.info("Already marked complete for today!");
      return;
    }

    try {
      const updatedHistory = [...(habit.completionHistory || []), today];
      const updatedHabit = { ...habit, completionHistory: updatedHistory };

      await axios.put(`http://localhost:3000/habit/${habit._id}`, updatedHabit);
      setHabit(updatedHabit);
      setCompletedToday(true);
      toast.success("Marked as complete!");
    } catch (error) {
      toast.error("Failed to mark complete!");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!habit) return <div className="text-center py-10">Habit not found</div>;

  // ✅ Calculate progress for last 30 days
  const last30 = habit.completionHistory?.slice(-30) || [];
  const progress = (last30.length / 30) * 100;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
      <motion.img
        src={habit.image}
        alt={habit.title}
        className="w-full h-64 object-cover rounded-xl mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      <h1 className="text-3xl font-semibold mb-2 text-gray-800">
        {habit.title}
      </h1>
      <p className="text-gray-600 mb-4">{habit.description}</p>

      <p className="text-sm font-medium text-gray-700">
        Category: <span className="text-pink-600">{habit.category}</span>
      </p>

      {/* Progress Bar */}
      <div className="mt-4">
        <p className="text-sm mb-1 text-gray-600">Progress (last 30 days):</p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Streak */}
      <div className="mt-3 text-sm text-gray-700">
        <strong>Streak:</strong> {habit.completionHistory?.length || 0} days 🔥
      </div>

      {/* Creator Info */}
      <div className="mt-4 border-t pt-3 text-sm text-gray-700">
        <p>
          <strong>Created by:</strong> {habit.creatorName || "Unknown"}
        </p>
        <p>{habit.creatorEmail}</p>
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
