import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
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
        `http://localhost:3000/habit/complete/${habit._id}`
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
        Habit not found! First Go to home/Public habit and click the details{" "}
        <br />
        button
        <Link className="btn bg-pink-400 text-white p-4" to={"/"}>
          Go to Home
        </Link>
      </div>
    );

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

      <div className="mt-4">
        <p className="text-sm mb-1 text-gray-600">Progress (last 30 days):</p>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div
            className="h-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-700">
        <strong>Streak:</strong> {habit.currentStreak || 0} days 🔥
      </div>

      <div className="mt-4 border-t pt-3 text-sm text-gray-700">
        <p>
          <strong>Created by:</strong> {habit.creatorName || "Unknown"}
        </p>
        <p>{habit.creatorEmail}</p>
      </div>

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
