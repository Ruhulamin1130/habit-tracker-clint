import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://habit-tracker-one-ashen.vercel.app/my-habits/${user.email}`
        )
        .then((res) => setHabits(res.data))
        .catch(() => toast.error("Failed to load habits"));
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this habit?")) return;
    try {
      await axios.delete(
        `https://habit-tracker-one-ashen.vercel.app/habit/${id}`
      );
      setHabits(habits.filter((habit) => habit._id !== id));
      toast.success("Habit deleted successfully!");
    } catch {
      toast.error("Failed to delete habit!");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-habit/${id}`);
  };

  const handleComplete = (id) => {
    navigate(`/habit/${id}`);
  };

  return (
    <div className="my-10 max-w-5xl mx-auto h-screen px-4">
      <h2 className="text-3xl font-bold text-pink-400 text-center mb-8">
        My Habits
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-pink-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Current Streak</th>
              <th className="py-3 px-4 text-left">Created Date</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id} className="hover:bg-gray-50 transition-all">
                <td className="py-3 px-4">{habit.title}</td>
                <td className="py-3 px-4">{habit.category}</td>
                <td className="py-3 px-4">{habit.currentStreak || 0} 🔥</td>
                <td className="py-3 px-4">
                  {new Date(habit.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleComplete(habit._id)}
                    className="flex items-center gap-1 btn btn-xs bg-green-500 hover:bg-green-600 text-white rounded-full px-3 py-1 transition"
                  >
                    <FaCheckCircle /> Complete
                  </button>
                  <button
                    onClick={() => handleUpdate(habit._id)}
                    className="flex items-center gap-1 btn btn-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-1 transition"
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(habit._id)}
                    className="flex items-center gap-1 btn btn-xs bg-red-500 hover:bg-red-600 text-white rounded-full px-3 py-1 transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {habits.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No habits found. Add some new habits!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyHabits;
